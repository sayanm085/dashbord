import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { 
  Minus, 
  Plus, 
  Trash, 
  PackageOpen, 
  Tag, 
  TicketPercent,
  AlertCircle,
  Box
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const CartItems = ({ items, onRemoveItem, onQuantityChange, onDiscountToggle }) => {
  const handleManualQuantityChange = (index, item, event) => {
    let value = Number(event.target.value);
    if (!value || value < 1) value = 1;
    if (item.currentQuantity && value > item.currentQuantity) {
      toast.error(`Cannot add more. Only ${item.currentQuantity} units available in stock.`);
      value = item.currentQuantity;
    }
    onQuantityChange(index, value);
  };

  const handleQuantityIncrease = (index, item, newQuantity) => {
    if (item.currentQuantity && newQuantity > item.currentQuantity) {
      toast.error(`Cannot add more. Only ${item.currentQuantity} units available in stock.`);
      return;
    }
    onQuantityChange(index, newQuantity);
  };

  const handleQuantityDecrease = (index, item) => {
    if (item.quantity > 1) {
      onQuantityChange(index, item.quantity - 1);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <PackageOpen className="h-16 w-16 mb-4 opacity-30" />
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="text-sm max-w-md text-center mt-1">
          Scan items using the barcode scanner or search for products to add them to your cart
        </p>
      </div>
    );
  }
  
  return (
    <TooltipProvider delayDuration={300}>
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[35%]">Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const basePrice = Number(item.price || 0);
              const stockPercentage = item.currentQuantity ? 
                Math.min(100, (item.quantity / item.currentQuantity) * 100) : 0;
              const isOverStock = item.currentQuantity && item.quantity > item.currentQuantity;
              const gstPercentage = Number(item.gstPercentage || 0);
              const gstAmount = (basePrice * gstPercentage) / 100;
              const priceWithGst = basePrice + gstAmount;
              const discountPercent = Number(item.discountPercent || 0);
              const discountAmount = item.applyDiscount && discountPercent > 0 ?
                (priceWithGst * discountPercent / 100) : 0;
              const finalUnitPrice = priceWithGst - discountAmount;
              const lineTotal = finalUnitPrice * item.quantity;
              
              return (
                <TableRow key={index} className={cn(
                  "group transition-colors",
                  isOverStock ? "bg-red-50" : ""
                )}>
                  <TableCell className="font-medium py-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="line-clamp-1">{item.name}</span>
                        {gstPercentage > 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="h-5 px-1 text-[10px] bg-blue-50 text-blue-600 hover:bg-blue-100">
                                +{gstPercentage}% GST
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">
                                GST: ₹{gstAmount.toFixed(2)}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {isOverStock && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="destructive" className="h-5 px-1">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                <span className="text-[10px]">Exceeds Stock</span>
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Only {item.currentQuantity} units available</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{item.barcode || "No Barcode"}</span>
                        {item.currentQuantity > 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1">
                                <Box className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  Stock: {item.currentQuantity}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Available stock: {item.currentQuantity}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      {item.currentQuantity > 0 && (
                        <Progress 
                          value={stockPercentage} 
                          max={100}
                          className={cn(
                            "h-1 mt-1.5",
                            stockPercentage > 80 ? "bg-red-100" : "bg-muted",
                            stockPercentage > 100 ? "text-red-500" : "text-primary"
                          )}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>₹{basePrice.toFixed(2)}</span>
                      {gstPercentage > 0 && (
                        <span className="text-xs text-muted-foreground">
                          +₹{gstAmount.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => handleQuantityDecrease(index, item)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <input
                          type="number"
                          min={1}
                          max={item.currentQuantity || 99999}
                          value={item.quantity}
                          onChange={e => handleManualQuantityChange(index, item, e)}
                          className="w-10 text-center px-1 py-0.5 border rounded bg-white outline-none text-base"
                          style={{ width: 38 }}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => handleQuantityIncrease(index, item, item.quantity + 1)}
                          disabled={item.currentQuantity && item.quantity >= item.currentQuantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      {discountPercent > 0 && (
                        <Button
                          variant={item.applyDiscount ? "default" : "outline"}
                          size="sm"
                          className="h-6 text-xs gap-1 w-full mt-0.5"
                          onClick={() => onDiscountToggle(index)}
                        >
                          {item.applyDiscount ? (
                            <>
                              <Tag className="h-3 w-3" />
                              {discountPercent}% off
                            </>
                          ) : (
                            <>
                              <TicketPercent className="h-3 w-3" />
                              Apply disc.
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {item.applyDiscount && discountPercent > 0 ? (
                        <>
                          <div className="flex items-center gap-1">
                            <span className="text-sm line-through text-muted-foreground">
                              ₹{(priceWithGst * item.quantity).toFixed(2)}
                            </span>
                            <Badge variant="outline" className="h-4 px-1 text-[10px] border-green-200 bg-green-50 text-green-600">
                              {discountPercent}% off
                            </Badge>
                          </div>
                          <span className="text-green-600">
                            ₹{(finalUnitPrice * item.quantity).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>₹{(priceWithGst * item.quantity).toFixed(2)}</span>
                          {discountPercent > 0 && !item.applyDiscount && (
                            <span className="text-xs text-muted-foreground">
                              Disc. available
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">
                        ₹{lineTotal.toFixed(2)}
                      </span>
                      {(gstPercentage > 0) && (
                        <span className="text-xs text-muted-foreground">
                          Incl. GST
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onRemoveItem(index)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </TooltipProvider>
  );
};
export default CartItems;