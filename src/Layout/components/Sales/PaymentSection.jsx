/**
 * Current Date and Time (UTC): 2025-06-28 12:31:46
 * Current User's Login: sayanm085
 */

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  CreditCard, 
  DollarSign, 
  Smartphone, 
  Receipt, 
  Loader2 
} from "lucide-react";

const PaymentSection = ({ orderTotals, onCompleteSale, isLoading }) => {
  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState("cash");
  
  // State for cash payment
  const [amountReceived, setAmountReceived] = useState("");
  const [change, setChange] = useState(0);
  
  // State for card payment
  const [cardDetails, setCardDetails] = useState({
    lastFour: "",
    transactionId: "",
  });
  
  // State for UPI payment
  const [upiTransactionId, setUpiTransactionId] = useState("");
  
  // Set default amount received when total changes
  useEffect(() => {
    if (orderTotals.total) {
      setAmountReceived(orderTotals.total.toFixed(0));
    }
  }, [orderTotals.total]);
  
  // Calculate change when amount received changes
  useEffect(() => {
    if (amountReceived && orderTotals.total) {
      const changeAmount = parseFloat(amountReceived) - orderTotals.total;
      setChange(changeAmount >= 0 ? changeAmount.toFixed(2) : 0);
    }
  }, [amountReceived, orderTotals.total]);
  
  // Handle payment method change
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };
  
  // Handle process payment
  const handleProcessPayment = () => {
    // Validate payment details
    if (paymentMethod === "cash") {
      if (!amountReceived || parseFloat(amountReceived) < orderTotals.total) {
        return;
      }
      
      onCompleteSale({
        paymentMethod: "cash",
        amountReceived: parseFloat(amountReceived),
      });
    } else if (paymentMethod === "card") {
      if (!cardDetails.lastFour || !cardDetails.transactionId) {
        return;
      }
      
      onCompleteSale({
        paymentMethod: "card",
        cardDetails,
      });
    } else if (paymentMethod === "upi") {
      if (!upiTransactionId) {
        return;
      }
      
      onCompleteSale({
        paymentMethod: "upi",
        upiTransactionId,
      });
    }
  };
  
  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg">Payment</CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 pb-0 flex-1">
        <div className="space-y-5">
          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">ORDER SUMMARY</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>₹{orderTotals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax:</span>
                <span>₹{orderTotals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount:</span>
                <span>₹{orderTotals.discount.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{orderTotals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="space-y-3 pt-4">
            <h3 className="font-medium text-sm text-muted-foreground">PAYMENT METHOD</h3>
            
            <Tabs 
              defaultValue="cash" 
              value={paymentMethod}
              onValueChange={handlePaymentMethodChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="cash" className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>Cash</span>
                </TabsTrigger>
                <TabsTrigger value="card" className="flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Card</span>
                </TabsTrigger>
                <TabsTrigger value="upi" className="flex items-center gap-1">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>UPI</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="cash" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="amountReceived">Amount Received (₹)</Label>
                  <Input
                    id="amountReceived"
                    type="number"
                    min={orderTotals.total}
                    step="0.01"
                    value={amountReceived}
                    onChange={(e) => setAmountReceived(e.target.value)}
                  />
                </div>
                
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Change:</span>
                    <span className="text-xl font-bold">₹{change}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="card" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="lastFour">Last 4 Digits</Label>
                  <Input
                    id="lastFour"
                    type="text"
                    maxLength={4}
                    placeholder="1234"
                    value={cardDetails.lastFour}
                    onChange={(e) => setCardDetails({...cardDetails, lastFour: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Transaction ID</Label>
                  <Input
                    id="transactionId"
                    type="text"
                    placeholder="TXN123456789"
                    value={cardDetails.transactionId}
                    onChange={(e) => setCardDetails({...cardDetails, transactionId: e.target.value})}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="upi" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="upiTransactionId">UPI Transaction ID</Label>
                  <Input
                    id="upiTransactionId"
                    type="text"
                    placeholder="UPI123456789012"
                    value={upiTransactionId}
                    onChange={(e) => setUpiTransactionId(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 mt-6">
        <Button
          className="w-full h-12 text-lg"
          onClick={handleProcessPayment}
          disabled={
            isLoading || 
            orderTotals.total <= 0 || 
            (paymentMethod === "cash" && (!amountReceived || parseFloat(amountReceived) < orderTotals.total)) ||
            (paymentMethod === "card" && (!cardDetails.lastFour || !cardDetails.transactionId)) ||
            (paymentMethod === "upi" && !upiTransactionId)
          }
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Receipt className="mr-2 h-5 w-5" />
              Pay ₹{orderTotals.total.toFixed(2)}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSection;