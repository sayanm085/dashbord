import React, { useState, useEffect, useRef } from "react";
import axiosInstance from '@/lib/axios';
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";
import BarcodeScanner from "../../../components/BarcodeScanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Barcode, 
  Search, 
  PackageOpen, 
  Camera,
  X,
  Loader2 
} from "lucide-react";

const ItemScanforSell = ({ onItemScanned }) => {
  const [barcode, setBarcode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const barcodeInputRef = useRef(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const fetchSuggestions = async () => {
      setIsLoadingResults(true);
      try {
        const response = await axiosInstance.get(
          `/api/search/inventory-suggestions?q=${debouncedSearchQuery}`
        );
        let results = [];
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.suggestions)
        ) {
          results = response.data.data.suggestions;
        }
        setSearchResults(results);
      } catch (error) {
        setSearchResults([]);
      } finally {
        setIsLoadingResults(false);
      }
    };
    fetchSuggestions();
  }, [debouncedSearchQuery]);

  const handleBarcodeSubmit = async (e) => {
    e.preventDefault();
    if (!barcode.trim()) return;
    lookupBarcode(barcode);
  };

  const handleScannedBarcode = (scannedCode) => {
    if (!scannedCode) return;
    setIsScannerOpen(false);
    lookupBarcode(scannedCode);
  };

  const processItemData = (item) => ({
    ...item,
    _id: item._id || "",
    itemId: item.itemId || item._id || "",
    name: item.name || 'Unknown Product',
    barcode: item.barcode || '',
    quantity: 1,
    price: Number(item.price) || 0,
    salePrice: Number(item.salePrice || item.price) || 0,
    currentSalePrice: Number(item.currentSalePrice || item.price) || 0,
    currentQuantity: Number(item.currentQuantity || item.quantity || 0),
    gstPercentage: Number(item.gstPercentage || 0),
    discountPercent: Number(item.discountPercent || 0),
    applyDiscount: false,
    totalPrice: Number(item.price) || 0
  });

  const lookupBarcode = async (barcodeValue) => {
    setIsSearching(true);
    try {
      const response = await axiosInstance.get(`/api/search/inventory/${barcodeValue}`);
      const item = response.data.data;
      if (!item) throw new Error("No product found");
      const processedItem = processItemData(item);
      onItemScanned(processedItem);
      setBarcode("");
      toast.success(`Added ${processedItem.name} to cart`);
    } catch (error) {
      toast.error(error.response?.data?.message || `No product found with barcode: ${barcodeValue}`);
    } finally {
      setIsSearching(false);
      if (barcodeInputRef.current) barcodeInputRef.current.focus();
    }
  };

  const handleSelectItem = (item) => {
    const processedItem = processItemData(item);
    onItemScanned(processedItem);
    setSearchQuery("");
    if (barcodeInputRef.current) barcodeInputRef.current.focus();
    toast.success(`Added ${processedItem.name} to cart`);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Barcode className="h-4 w-4" />
            <span>Scan Barcode</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search Products</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="scan" className="space-y-4">
          <form onSubmit={handleBarcodeSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                ref={barcodeInputRef}
                type="text"
                placeholder="Enter barcode manually"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="pl-10"
                disabled={isSearching}
              />
              {barcode && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setBarcode("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSearching || !barcode.trim()}
              className="min-w-[80px]"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Lookup"
              )}
            </Button>
          </form>
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setIsScannerOpen(true)}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              <span>Open Camera Scanner</span>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="search" className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, category, or brand"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <div className="mt-2 relative min-h-[100px]">
            {isLoadingResults && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
            {searchResults.length > 0 ? (
              <div className="border rounded-md overflow-hidden divide-y">
                {searchResults.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 hover:bg-muted cursor-pointer"
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">
                          {item.highlightedName ? (
                            <span dangerouslySetInnerHTML={{ __html: item.highlightedName }} />
                          ) : item.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Barcode className="h-3 w-3" />
                          <span>{item.highlightedBarcode || item.barcode || "No barcode"}</span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        ₹{Number(item.price || 0).toFixed(2)}
                      </div>
                    </div>
                    <div className="mt-1.5 flex justify-between items-center text-xs">
                      <div className="text-muted-foreground">
                        {item.secondaryInfo}
                      </div>
                      <div className={item.stockStatusClass}>
                        {item.stockStatus}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !isLoadingResults && searchQuery.length >= 2 && (
                <div className="flex flex-col items-center justify-center py-8 border rounded-md bg-muted/30">
                  <PackageOpen className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No products found</p>
                </div>
              )
            )}
            {searchQuery.length < 2 && !isLoadingResults && (
              <p className="text-xs text-center text-muted-foreground mt-4">
                Type at least 2 characters to search for products
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent className="sm:max-w-md p-3 gap-0 max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle>Scan Item Barcode</DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
            <p className="text-sm text-muted-foreground">
              Point your camera at a barcode to add the item
            </p>
          </DialogHeader>
          <div className="w-full overflow-auto">
            <BarcodeScanner
              onCodeScanned={handleScannedBarcode}
              onClose={() => setIsScannerOpen(false)}
              autoStart={true}
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ItemScanforSell;