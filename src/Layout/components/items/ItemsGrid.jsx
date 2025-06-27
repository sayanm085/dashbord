/**
 * Current Date and Time (UTC): 2025-06-26 15:37:49
 * Current User's Login: sayanm085
 */

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios'; // Adjust the import based on your axios setup
import { Plus, Edit, Trash2, Filter, Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function ItemsGrid({ onAddItem, onEditItem }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGst, setSelectedGst] = useState('all');
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/items');
        setItems(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, []);
  
  // Filter items by GST percentage
  const filteredItems = selectedGst === 'all' 
    ? items 
    : items.filter(item => item.gstPercentage === parseInt(selectedGst));
  
  // Open delete confirmation dialog
  const confirmDelete = (id) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };
  
  // Delete item handler
  const handleDeleteItem = async () => {
    if (!deleteItemId) return;
    
    try {
      await axiosInstance.delete(`/api/items/${deleteItemId}`);
      setItems(items.filter(item => item._id !== deleteItemId));
      setDeleteDialogOpen(false);
      setDeleteItemId(null);
    } catch (err) {
      console.error('Error deleting item:', err);
      // You could set an error state here to show a message
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedGst} onValueChange={setSelectedGst}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by GST" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All GST Rates</SelectItem>
              <SelectItem value="0">0% GST</SelectItem>
              <SelectItem value="5">5% GST</SelectItem>
              <SelectItem value="12">12% GST</SelectItem>
              <SelectItem value="18">18% GST</SelectItem>
              <SelectItem value="28">28% GST</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-slate-100 animate-pulse" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      ) : (
        <>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 border rounded-md bg-slate-50">
              <div className="mb-3 text-slate-400">
                <Plus size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-1">No items found</h3>
              <p className="text-muted-foreground mb-4">
                {selectedGst !== 'all' 
                  ? `No items with ${selectedGst}% GST rate found.` 
                  : 'Add some items to your inventory.'}
              </p>
              {selectedGst !== 'all' ? (
                <Button variant="outline" onClick={() => setSelectedGst('all')}>
                  Show All Items
                </Button>
              ) : (
                <Button onClick={onAddItem}>
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <Card key={item._id} className="overflow-hidden">
                  <div className="relative h-48 bg-slate-100">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-full h-full object-contain p-4"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/400x300?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2">
                      {item.gstPercentage}% GST
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                      <span className="bg-slate-100 px-2 py-0.5 rounded">
                        {item.barcode || 'No Barcode'}
                      </span>
                    </div>
                    <div className="text-sm mt-2 flex justify-between">
                      <span>{item.weight?.value} {item.weight?.unit}</span>
                      <span className="font-medium">
                        {item.price ? `₹${item.price.toFixed(2)}` : 'Price N/A'}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 pt-0 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEditItem(item)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => confirmDelete(item._id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              selected item from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteItem}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}