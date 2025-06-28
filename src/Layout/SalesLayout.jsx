import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axiosInstance from '@/lib/axios';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ItemScanforSell from "./components/Sales/ItemScanforSell.jsx";
import CartItems from "./components/Sales/CartItems.jsx";
import CustomerSelect from "./components/Sales/CustomerSelect.jsx";
import PaymentSection from "./components/Sales/PaymentSection.jsx";
import ReceiptDialog from "./components/Sales/ReceiptDialog.jsx";
import { ShoppingCart, User, ArrowLeft } from "lucide-react";

const SalesLayout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [orderTotals, setOrderTotals] = useState({
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = cartItems.reduce((sum, item) => sum + (item.taxAmount || 0), 0);
    const discount = cartItems.reduce((sum, item) => sum + (item.discountAmount || 0), 0);
    const total = subtotal + tax - discount;
    setOrderTotals({
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    });
  }, [cartItems]);

  const handleAddItem = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.barcode === item.barcode
    );
    const itemStock = item.currentQuantity || item.quantity || 0;

    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      const currentQty = updatedItems[existingItemIndex].quantity;
      if (currentQty + 1 > itemStock) {
        toast.error(`Cannot add more. Only ${itemStock} units available in stock.`);
        return;
      }
      updatedItems[existingItemIndex].quantity += 1;
      const cartItm = updatedItems[existingItemIndex];
      const price = cartItm.price;
      const quantity = cartItm.quantity;
      const gstPercentage = cartItm.gstPercentage || 0;
      const discountPercent = cartItm.discountPercent || 0;
      cartItm.taxAmount = (price * quantity * gstPercentage) / 100;
      cartItm.discountAmount = (price * quantity * discountPercent) / 100;
      cartItm.totalPrice = (price * quantity) - cartItm.discountAmount;
      setCartItems(updatedItems);
    } else {
      if (itemStock < 1) {
        toast.error("Item is out of stock, cannot add to cart.");
        return;
      }
      const newItem = {
        itemId: item.itemId || item._id,
        name: item.name,
        barcode: item.barcode,
        price: item.salePrice,
        quantity: 1,
        gstPercentage: item.gstPercentage || 0,
        taxAmount: (item.salePrice * (item.gstPercentage || 0)) / 100,
        discountPercent: item.discountPercent || 0,
        discountAmount: (item.salePrice * (item.discountPercent || 0)) / 100,
        totalPrice: item.salePrice - (item.salePrice * (item.discountPercent || 0)) / 100,
        applyDiscount: Boolean(item.discountPercent),
        currentQuantity: item.currentQuantity || item.quantity || 0,
        _id: item.itemId || item._id,
      };
      setCartItems([...cartItems, newItem]);
    }
    toast.success(`Added ${item.name} to cart`);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = [...cartItems];
    const maxStock = updatedItems[index].currentQuantity || updatedItems[index].quantity || 0;
    if (maxStock && newQuantity > maxStock) {
      toast.error(`Cannot add more. Only ${maxStock} units available in stock.`);
      updatedItems[index].quantity = maxStock;
    } else {
      updatedItems[index].quantity = newQuantity;
    }
    const price = updatedItems[index].price;
    const gstPercentage = updatedItems[index].gstPercentage || 0;
    const discountPercent = updatedItems[index].discountPercent || 0;
    updatedItems[index].taxAmount = (price * updatedItems[index].quantity * gstPercentage) / 100;
    updatedItems[index].discountAmount = (price * updatedItems[index].quantity * discountPercent) / 100;
    updatedItems[index].totalPrice = (price * updatedItems[index].quantity) - updatedItems[index].discountAmount;
    setCartItems(updatedItems);
  };

  const handleDiscountToggle = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].applyDiscount = !updatedItems[index].applyDiscount;
    if (updatedItems[index].applyDiscount) {
      updatedItems[index].discountPercent = cartItems[index].discountPercent || 0;
    } else {
      updatedItems[index].discountPercent = 0;
    }
    const price = updatedItems[index].price;
    const quantity = updatedItems[index].quantity;
    const discountPercent = updatedItems[index].discountPercent || 0;
    updatedItems[index].discountAmount = (price * quantity * discountPercent) / 100;
    updatedItems[index].totalPrice = (price * quantity) - updatedItems[index].discountAmount;
    setCartItems(updatedItems);
  };

  // ---- API PAYLOAD LOGIC ----
  const handleCompleteSale = async (paymentDetails) => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setIsLoading(true);
    let saleId = null;
    try {
      // Sanitize items for API
      const items = cartItems
        .filter(item => item.barcode && Number(item.quantity) > 0)
        .map(item => ({
          barcode: String(item.barcode),
          quantity: Number(item.quantity)
        }));

      if (items.length === 0) throw new Error("No valid items in cart");

      let customerDetails = undefined;
      if (customer && customer.name && customer.phone) {
        customerDetails = {
          name: customer.name,
          phone: customer.phone,
        };
        if (customer.email) customerDetails.email = customer.email;
      }

      const orderData = {
        counterNumber: 1, // Use a valid counter number (must exist in your backend DB)
        items,
        ...(customerDetails && { customerDetails })
      };

      for (const item of items) {
        if (!item.barcode || typeof item.barcode !== "string" || item.barcode.trim() === "") {
          throw new Error("One or more items have an invalid barcode.");
        }
        if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
          throw new Error("One or more items have an invalid quantity.");
        }
      }

      if (orderData.customerDetails && (!orderData.customerDetails.name || !orderData.customerDetails.phone)) {
        delete orderData.customerDetails;
      }

      // Create order
      const response = await axiosInstance.post("/api/sales/create-order", orderData);
      saleId = response.data.data._id;

      // Now process payment/complete transaction

      console.log("Processing payment with details:", paymentDetails);
      const completeResponse = await axiosInstance.post(
        `/api/sales/${saleId}/complete-transaction`,
        paymentDetails
      );
      setReceiptData(completeResponse.data.data);
      setShowReceipt(true);
      setCartItems([]);
      setCustomer(null);
      toast.success("Sale completed successfully");
    } catch (error) {
      // Try to extract the most useful error message from backend, including for payment
      let msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        (error?.response?.data && typeof error?.response?.data === "string" ? error?.response?.data : null) ||
        error?.message ||
        "Failed to complete sale";

      // Show network or server errors clearly if backend is not returning JSON
      if (
        error?.response &&
        (!error?.response?.data || typeof error?.response?.data !== "object")
      ) {
        msg = `Server error (status ${error?.response?.status}): ${error?.response?.statusText}`;
      }

      toast.error("Error completing sale: " + msg);
      console.error("Error completing sale:", error, error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-bold">Sales Terminal</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {customer ? (
              <div className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium">{customer.name}</span>
                <Badge variant="secondary" className="ml-1">
                  {customer.loyaltyPoints || 0} points
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 rounded-full" 
                  onClick={() => setCustomer(null)}
                >
                  <span className="sr-only">Remove customer</span>
                  <span aria-hidden="true">×</span>
                </Button>
              </div>
            ) : (
              <CustomerSelect onSelectCustomer={setCustomer} />
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <div className="col-span-8 flex flex-col gap-6">
          <Card className="shadow-sm">
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-lg">Scan Products</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <ItemScanforSell onItemScanned={handleAddItem} />
            </CardContent>
          </Card>
          <Card className="shadow-sm flex-1">
            <CardHeader className="px-6 py-4">
              <div className="flex justify-between">
                <CardTitle className="text-lg">Shopping Cart</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0 flex-1">
              <CartItems 
                items={cartItems} 
                onRemoveItem={handleRemoveItem}
                onQuantityChange={handleQuantityChange}
                onDiscountToggle={handleDiscountToggle}
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4">
          <PaymentSection 
            orderTotals={orderTotals}
            onCompleteSale={handleCompleteSale}
            isLoading={isLoading}
          />
        </div>
      </main>
      <ReceiptDialog 
        open={showReceipt}
        onOpenChange={setShowReceipt}
        receiptData={receiptData}
      />
    </div>
  );
};

export default SalesLayout;