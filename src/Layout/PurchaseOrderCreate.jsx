/**
 * Current Date and Time (UTC): 2025-06-27 18:52:15
 * Current User's Login: sayanm085
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import toast from "react-hot-toast";
import axiosInstance from '@/lib/axios';

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Icons
import {
  Search,
  Barcode,
  CalendarIcon,
  Plus,
  Trash,
  Save,
  Loader2,
  FileText,
  PackageOpen,
  ChevronRight,
} from "lucide-react";

// Custom Components
import BarcodeScanner from "./components/PurchaseOrder/BarcodeScanner";
import DealerSearch from "./components/PurchaseOrder/DealerSearch";
import ItemSearch from "./components/PurchaseOrder/ItemSearch";
import AddNewItemDialog from "./components/PurchaseOrder/AddNewItemDialog";

// Form schema validation
const formSchema = z.object({
  dealerId: z.string().min(1, "Dealer is required"),
  poNumber: z.string().min(1, "PO Number is required"),
  expectedDeliveryDate: z.date({
    required_error: "Expected delivery date is required",
  }),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  notes: z.string().optional(),
});

export default function PurchaseOrderCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dealer, setDealer] = useState(null);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isBarcodeDialogOpen, setIsBarcodeDialogOpen] = useState(false);
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false);
  const [newItemInitialName, setNewItemInitialName] = useState("");
  const [newItemBarcodeValue, setNewItemBarcodeValue] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [searchLoading, setSearchLoading] = useState(false);

  // Generate a default PO number
  const getDefaultPoNumber = () => {
    return `PO-${format(new Date(), "yyyy-MMdd")}-${Math.floor(
      Math.random() * 1000
    )
      .toString()
      .padStart(3, "0")}`;
  };

  const defaultFormValues = {
    poNumber: getDefaultPoNumber(),
    paymentTerms: "Net 30",
    expectedDeliveryDate: new Date(
      new Date().setDate(new Date().getDate() + 7)
    ),
  };

  // Form setup
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  // Reset form to initial state
  const resetForm = () => {
    // Reset form fields to default values with a new PO number
    form.reset({
      ...defaultFormValues,
      poNumber: getDefaultPoNumber(),
    });
    
    // Clear dealer, items, and current item
    setDealer(null);
    setItems([]);
    setCurrentItem(null);
    
    // Reset to details tab
    setActiveTab("details");
  };

  // Handle dealer selection
  const handleDealerSelect = (selectedDealer) => {
    setDealer(selectedDealer);
    form.setValue("dealerId", selectedDealer._id);
  };

  // Handle item addition via search
  const handleItemSelect = (selectedItem) => {
    setCurrentItem({
      ...selectedItem,
      quantity: 1,
      unitPrice: selectedItem.costPrice || 0,
      salePrice: selectedItem.salePrice || 0,
    });
  };

  // Search for item by barcode or query - used by both barcode scanner and search
  const searchItem = async (query) => {
    setSearchLoading(true);
    try {
      // Use the same API endpoint as in ItemSearch component
      const response = await axiosInstance.get(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
      
      // Process the response similar to how ItemSearch component does
      let items = [];
      if (response.data && response.data.data) {
        if (Array.isArray(response.data.data.suggestions)) {
          items = response.data.data.suggestions;
        } else if (Array.isArray(response.data.data)) {
          items = response.data.data;
        }
      }
      
      if (items.length > 0) {
        // Found at least one item
        const item = items[0]; // Select the first match
        return item;
      } else {
        // No items found
        throw new Error("Item not found");
      }
    } catch (error) {
      console.error('Error searching item:', error);
      throw error;
    } finally {
      setSearchLoading(false);
    }
  };

  // Open new item form
  const openNewItemForm = (searchQuery = "", barcodeValue = "") => {
    setNewItemInitialName(searchQuery);
    setNewItemBarcodeValue(barcodeValue);
    setIsNewItemDialogOpen(true);
  };

  // Add new item from form
  const handleAddNewItem = (newItem) => {
    setItems([...items, newItem]);
  };

  // Handle barcode scan
  const handleBarcodeScan = async (barcode) => {
    try {
      // Use the same search function that's used for normal searching
      const item = await searchItem(barcode);
      
      setCurrentItem({
        ...item,
        quantity: 1,
        unitPrice: item.costPrice || 0,
        salePrice: item.salePrice || 0,
      });
      
      setIsBarcodeDialogOpen(false);
      setActiveTab("items");
      
      toast.success(`${item.name} has been found and added to your form.`);
    } catch (error) {
      toast.error("Item not found for this barcode");
      
      // Option to create new item with this barcode
      const createNew = window.confirm("Item not found for this barcode. Would you like to add it as a new item?");
      if (createNew) {
        setIsBarcodeDialogOpen(false);
        // Pass the barcode value to the new item form
        openNewItemForm("", barcode);
      }
    }
  };

  // Add current item to items list
  const addItemToList = () => {
    if (!currentItem) return;
    
    // Validation
    if (!currentItem.quantity || currentItem.quantity <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }
    
    if (!currentItem.unitPrice || currentItem.unitPrice <= 0) {
      toast.error("Unit price must be greater than zero");
      return;
    }
    
    if (!currentItem.salePrice || currentItem.salePrice <= 0) {
      toast.error("Sale price must be greater than zero");
      return;
    }
    
    // Check if item already exists, update quantity if so
    const existingItemIndex = items.findIndex(i => 
      (i._id && i._id === currentItem._id) || 
      (!i._id && i.barcode === currentItem.barcode)
    );
    
    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += parseInt(currentItem.quantity);
      setItems(updatedItems);
      toast.success(`Updated ${currentItem.name} quantity`);
    } else {
      setItems([...items, {...currentItem}]);
      toast.success(`Added ${currentItem.name} to order`);
    }
    
    // Clear current item
    setCurrentItem(null);
  };

  // Handle no search results
  const handleNoSearchResults = (query) => {
    const createNew = window.confirm(`No items found for "${query}". Would you like to add a new item?`);
    if (createNew) {
      openNewItemForm(query);
    }
  };

  // Remove item from list
  const removeItem = (index) => {
    const removedItem = items[index];
    setItems(items.filter((_, i) => i !== index));
    toast.success(`Removed ${removedItem.name} from order`);
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    
    const taxAmount = items.reduce(
      (acc, item) => 
        acc + 
        (item.quantity * item.unitPrice * (item.gstPercentage || 0)) / 100,
      0
    );
    
    return {
      subtotal,
      taxAmount,
      total: subtotal + taxAmount,
    };
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (items.length === 0) {
      toast.error("Please add at least one item to the purchase order");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare items for API: separate existing and new items
      const formattedItems = items.map(item => {
        if (item._id) {
          // Existing item - use itemId format
          return {
            itemId: item._id,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            salePrice: item.salePrice,
          };
        } else {
          // New item - include all details
          return {
            name: item.name,
            barcode: item.barcode,
            weight: item.weight,
            gstPercentage: item.gstPercentage,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            salePrice: item.salePrice,
          };
        }
      });

      const purchaseData = {
        ...data,
        items: formattedItems,
      };

      const response = await axiosInstance.post("/api/sales/purchaseproduct", purchaseData);

      // Show success message
      toast.success("Purchase order has been created successfully");
      
      // Reset the form to initial state
      resetForm();
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create purchase order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { subtotal, taxAmount, total } = calculateTotals();

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Create Purchase Order
            </h1>
            <p className="text-muted-foreground mt-1">
              Add items to purchase from dealers
            </p>
          </div>
          <div className="flex space-x-3">
            <Dialog open={isBarcodeDialogOpen} onOpenChange={setIsBarcodeDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Barcode className="h-4 w-4" />
                  Scan Barcode
                </Button>
              </DialogTrigger>
              <DialogContent 
                className="max-w-full sm:max-w-[95vw] md:max-w-[80vw] lg:max-w-[768px] p-0 h-[80vh] sm:h-auto"
                onInteractOutside={(e) => e.preventDefault()}
              >
                <div className="flex flex-col h-full">
                  <DialogHeader className="p-4 pb-0">
                    <DialogTitle>Scan Item Barcode</DialogTitle>
                    <DialogDescription>
                      Point your camera at a barcode to add the item
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-grow p-4 flex items-center justify-center">
                    <div className="w-full h-full max-h-[60vh] relative rounded-lg overflow-hidden">
                      <BarcodeScanner 
                        onCodeScanned={handleBarcodeScan} 
                        onClose={() => setIsBarcodeDialogOpen(false)}
                        autoStart={true}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              type="submit" 
              form="purchase-form"
              disabled={isSubmitting || items.length === 0}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Order
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form section */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Order Details
                </TabsTrigger>
                <TabsTrigger value="items" className="flex items-center gap-2">
                  <PackageOpen className="h-4 w-4" />
                  Items {items.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {items.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <Form {...form}>
                <form id="purchase-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <TabsContent value="details">
                    <Card>
                      <CardHeader>
                        <CardTitle>Order Information</CardTitle>
                        <CardDescription>
                          Enter the details for this purchase order
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Dealer Selection */}
                        <div className="space-y-4">
                          <FormLabel>Dealer</FormLabel>
                          <DealerSearch onDealerSelect={handleDealerSelect} />
                          
                          {dealer && (
                            <Card className="bg-muted/40">
                              <CardContent className="pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Name</p>
                                    <p className="text-sm">{dealer.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Contact Person</p>
                                    <p className="text-sm">{dealer.contactPerson}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm">{dealer.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <p className="text-sm">{dealer.phone}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>

                        {/* PO Number */}
                        <FormField
                          control={form.control}
                          name="poNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PO Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                Unique identifier for this purchase order
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Delivery Date */}
                        <FormField
                          control={form.control}
                          name="expectedDeliveryDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Expected Delivery Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={`w-full pl-3 text-left font-normal ${
                                        !field.value && "text-muted-foreground"
                                      }`}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date()
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Payment Terms */}
                        <FormField
                          control={form.control}
                          name="paymentTerms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Terms</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select payment terms" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Net 15">Net 15</SelectItem>
                                  <SelectItem value="Net 30">Net 30</SelectItem>
                                  <SelectItem value="Net 45">Net 45</SelectItem>
                                  <SelectItem value="Net 60">Net 60</SelectItem>
                                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Notes */}
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notes</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Additional information about this order..."
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="ghost"
                          onClick={resetForm}
                        >
                          Reset
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => setActiveTab("items")}
                          disabled={!dealer}
                        >
                          Continue to Items
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="items">
                    <Card>
                      <CardHeader>
                        <CardTitle>Items</CardTitle>
                        <CardDescription>
                          Search for items or scan barcodes to add to this order
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Item Search */}
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <ItemSearch 
                                onItemSelect={handleItemSelect} 
                                onNoResults={handleNoSearchResults}
                              />
                            </div>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => setIsBarcodeDialogOpen(true)}
                            >
                              <Barcode className="h-4 w-4" />
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => openNewItemForm()}
                              className="flex items-center gap-1"
                            >
                              <Plus className="h-4 w-4" />
                              New
                            </Button>
                          </div>
                          
                          {/* Current Item Form */}
                          {currentItem && (
                            <Card className="bg-muted/40">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                  {currentItem.name}
                                </CardTitle>
                                <CardDescription>
                                  Barcode: {currentItem.barcode}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  <div>
                                    <FormLabel htmlFor="quantity" className="text-xs">
                                      Quantity
                                    </FormLabel>
                                    <Input
                                      id="quantity"
                                      type="number"
                                      min="1"
                                      value={currentItem.quantity}
                                      onChange={(e) =>
                                        setCurrentItem({
                                          ...currentItem,
                                          quantity: parseInt(e.target.value) || 0,
                                        })
                                      }
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <FormLabel htmlFor="cost-price" className="text-xs">
                                      Cost Price
                                    </FormLabel>
                                    <Input
                                      id="cost-price"
                                      type="number"
                                      min="0.01"
                                      step="0.01"
                                      value={currentItem.unitPrice}
                                      onChange={(e) =>
                                        setCurrentItem({
                                          ...currentItem,
                                          unitPrice: parseFloat(e.target.value) || 0,
                                        })
                                      }
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <FormLabel htmlFor="sale-price" className="text-xs">
                                      Sale Price
                                    </FormLabel>
                                    <Input
                                      id="sale-price"
                                      type="number"
                                      min="0.01"
                                      step="0.01"
                                      value={currentItem.salePrice}
                                      onChange={(e) =>
                                        setCurrentItem({
                                          ...currentItem,
                                          salePrice: parseFloat(e.target.value) || 0,
                                        })
                                      }
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-end pt-0">
                                <Button 
                                  type="button" 
                                  onClick={() => setCurrentItem(null)}
                                  variant="ghost"
                                  className="mr-2"
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  type="button" 
                                  onClick={addItemToList}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <Plus className="mr-1 h-4 w-4" />
                                  Add Item
                                </Button>
                              </CardFooter>
                            </Card>
                          )}
                        </div>

                        {/* Items Table */}
                        {items.length > 0 ? (
                          <div className="border rounded-md">
                            <ScrollArea className="h-[320px]">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-[300px]">Item</TableHead>
                                    <TableHead className="text-right">Qty</TableHead>
                                    <TableHead className="text-right">Unit Price</TableHead>
                                    <TableHead className="text-right">Sale Price</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead className="w-[70px]"></TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {items.map((item, index) => (
                                    <TableRow key={index}>
                                      <TableCell className="font-medium">
                                        <div>
                                          {item.name}
                                          {item.isNewItem && (
                                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200 text-xs">
                                              New
                                            </Badge>
                                          )}
                                          <div className="text-xs text-muted-foreground">
                                            {item.barcode}
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        {item.quantity}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        ₹{item.unitPrice.toFixed(2)}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        ₹{item.salePrice.toFixed(2)}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        ₹{(item.quantity * item.unitPrice).toFixed(2)}
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => removeItem(index)}
                                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                        >
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </ScrollArea>
                          </div>
                        ) : (
                          <div className="border rounded-md flex flex-col items-center justify-center p-8 bg-muted/40">
                            <PackageOpen className="h-12 w-12 text-muted-foreground mb-2" />
                            <h3 className="text-lg font-medium">No items added yet</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Search for items or scan barcodes to add them to this order
                            </p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-3">
                        {items.length > 0 && (
                          <div className="w-full">
                            <div className="flex justify-between py-2 border-t">
                              <span>Subtotal</span>
                              <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span>Tax</span>
                              <span>₹{taxAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2 font-medium border-t">
                              <span>Total</span>
                              <span>₹{total.toFixed(2)}</span>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between w-full">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setActiveTab("details")}
                          >
                            Back to Details
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting || items.length === 0}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Create Order
                              </>
                            )}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </form>
              </Form>
            </Tabs>
          </div>

          {/* Summary section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Order Status</span>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Draft
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">PO Number</span>
                    <span className="font-medium">{form.watch("poNumber")}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Dealer</span>
                    <span className="font-medium">
                      {dealer ? dealer.name : "Not selected"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Expected Delivery</span>
                    <span className="font-medium">
                      {form.watch("expectedDeliveryDate") 
                        ? format(form.watch("expectedDeliveryDate"), "MMM d, yyyy") 
                        : "Not set"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Payment Terms</span>
                    <span className="font-medium">{form.watch("paymentTerms")}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Items Summary</h3>
                  
                  {items.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Items</span>
                        <Badge variant="secondary">{items.length}</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Quantity</span>
                        <span className="font-medium">
                          {items.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Tax</span>
                        <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-medium">Total Amount</span>
                        <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 border rounded-md bg-muted/40">
                      <PackageOpen className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">
                        No items added yet
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => setActiveTab(activeTab === "details" ? "items" : "details")}
                >
                  {activeTab === "details" ? (
                    <>
                      <PackageOpen className="mr-2 h-4 w-4" />
                      Go to Items
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Edit Details
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* New Item Dialog */}
      <AddNewItemDialog 
        open={isNewItemDialogOpen}
        onOpenChange={setIsNewItemDialogOpen}
        onAddItem={handleAddNewItem}
        initialName={newItemInitialName}
        initialBarcode={newItemBarcodeValue}
      />
    </div>
  );
}