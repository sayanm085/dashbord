/**
 * Current Date and Time (UTC): 2025-06-28 12:31:46
 * Current User's Login: sayanm085
 */

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { Printer, Download, Check } from "lucide-react";

const ReceiptDialog = ({ open, onOpenChange, receiptData }) => {
  // Generate and print receipt
  const handlePrintReceipt = () => {
    if (!receiptData) return;
    
    const printWindow = window.open('', '_blank');
    
    // Generate receipt HTML
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sales Receipt</title>
        <style>
          body { font-family: 'Courier New', Courier, monospace; font-size: 12px; margin: 0; padding: 0; }
          .receipt { width: 300px; margin: 0 auto; padding: 10px; }
          .header { text-align: center; margin-bottom: 10px; }
          .store-name { font-size: 16px; font-weight: bold; }
          .item-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .item-details { font-size: 11px; color: #666; }
          .totals { border-top: 1px dashed #000; padding-top: 5px; margin-top: 10px; }
          .total-row { display: flex; justify-content: space-between; }
          .grand-total { font-weight: bold; margin-top: 5px; }
          .footer { text-align: center; margin-top: 20px; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="store-name">SuperMarket POS</div>
            <div>${new Date(receiptData.date).toLocaleString()}</div>
            <div>Invoice #: ${receiptData.invoiceNumber}</div>
          </div>
          
          <div class="items">
            ${receiptData.items.map(item => `
              <div class="item-row">
                <div>
                  <div>${item.name} x${item.quantity}</div>
                  <div class="item-details">₹${item.price.toFixed(2)} each</div>
                </div>
                <div>₹${item.totalPrice.toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="totals">
            <div class="total-row">
              <div>Subtotal:</div>
              <div>₹${receiptData.subtotal.toFixed(2)}</div>
            </div>
            <div class="total-row">
              <div>GST:</div>
              <div>₹${receiptData.taxAmount.toFixed(2)}</div>
            </div>
            <div class="total-row">
              <div>Discount:</div>
              <div>₹${receiptData.discountAmount.toFixed(2)}</div>
            </div>
            ${receiptData.additionalDiscount ? `
              <div class="total-row">
                <div>Additional Discount:</div>
                <div>₹${receiptData.additionalDiscount.toFixed(2)}</div>
              </div>
            ` : ''}
            <div class="total-row grand-total">
              <div>TOTAL:</div>
              <div>₹${receiptData.total.toFixed(2)}</div>
            </div>
            ${receiptData.paymentMethod === 'cash' ? `
              <div class="total-row">
                <div>Paid:</div>
                <div>₹${receiptData.paymentDetails.amountReceived.toFixed(2)}</div>
              </div>
              <div class="total-row">
                <div>Change:</div>
                <div>₹${receiptData.paymentDetails.change.toFixed(2)}</div>
              </div>
            ` : ''}
            <div class="total-row">
              <div>Payment Method:</div>
              <div>${receiptData.paymentMethod.toUpperCase()}</div>
            </div>
          </div>
          
          <div class="footer">
            <div>Thank you for your purchase!</div>
            ${receiptData.pointsEarned ? `<div>You earned ${receiptData.pointsEarned} loyalty points!</div>` : ''}
            <div>Visit us again soon.</div>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          };
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
  };
  
  if (!receiptData) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Sale Receipt</span>
              <Badge variant="outline" className="ml-2">
                {receiptData.status}
              </Badge>
            </div>
            {receiptData.invoiceNumber && (
              <span className="text-sm font-normal text-muted-foreground">
                #{receiptData.invoiceNumber}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground flex justify-between">
            <span>Transaction Date:</span>
            <span>{new Date(receiptData.date).toLocaleString()}</span>
          </div>
          
          <ScrollArea className="h-60 rounded-md border p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                {receiptData.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start py-1 group">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.quantity} x ₹{item.price.toFixed(2)}
                        {item.discountPercent > 0 && ` (-${item.discountPercent}%)`}
                      </div>
                    </div>
                    <div className="font-medium">₹{item.totalPrice.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{receiptData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST:</span>
                  <span>₹{receiptData.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount:</span>
                  <span>₹{receiptData.discountAmount.toFixed(2)}</span>
                </div>
                {receiptData.additionalDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Additional Discount:</span>
                    <span>₹{receiptData.additionalDiscount.toFixed(2)}</span>
                  </div>
                )}
                {receiptData.pointsDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Points Discount:</span>
                    <span>₹{receiptData.pointsDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>₹{receiptData.total.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Payment Method:</span>
                  <span className="capitalize">{receiptData.paymentMethod}</span>
                </div>
                
                {receiptData.paymentMethod === 'cash' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Amount Received:</span>
                      <span>₹{receiptData.paymentDetails.amountReceived.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Change:</span>
                      <span>₹{receiptData.paymentDetails.change.toFixed(2)}</span>
                    </div>
                  </>
                )}
                
                {receiptData.paymentMethod === 'card' && receiptData.paymentDetails.cardDetails && (
                  <div className="flex justify-between text-sm">
                    <span>Card:</span>
                    <span>XXXX-{receiptData.paymentDetails.cardDetails.lastFour}</span>
                  </div>
                )}
                
                {receiptData.paymentMethod === 'upi' && (
                  <div className="flex justify-between text-sm">
                    <span>UPI ID:</span>
                    <span>{receiptData.paymentDetails.upiTransactionId}</span>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
          
          {receiptData.pointsEarned > 0 && (
            <div className="flex items-center justify-center p-3 bg-primary/10 rounded-md text-primary">
              <Check className="h-4 w-4 mr-2" />
              <span className="font-medium">Customer earned {receiptData.pointsEarned} loyalty points!</span>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handlePrintReceipt}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button>
              <Check className="h-4 w-4 mr-2" />
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;