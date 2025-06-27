
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

// Import components from relative paths (assuming these are React components)
import { ItemSearch } from './components/search/ItemSearch.jsx';
import { ItemsGrid } from './components/items/ItemsGrid.jsx';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

function ItemsShowLayout() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
  
  const handleAddItem = () => {
    setSelectedItem(null);
    setDialogMode("add");
    setIsDialogOpen(true);
  };
  
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };
  
  const handleSearchItemSelect = (item) => {
    // You can choose to view the item details or edit it when selected from search
    setSelectedItem(item);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inventory Items</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <ItemSearch onItemSelect={handleSearchItemSelect} />
          <Button onClick={handleAddItem}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <ItemsGrid onAddItem={handleAddItem} onEditItem={handleEditItem} />
      
      {/* Add/Edit Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "add" ? "Add New Item" : "Edit Item"}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === "add" 
                ? "Add a new item to your inventory" 
                : "Update the details of this item"}
            </DialogDescription>
          </DialogHeader>
          
          {/* Form would go here - Form component omitted for brevity */}
          <div className="h-[400px] flex items-center justify-center border rounded-md">
            <p className="text-muted-foreground">Item form fields would go here</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button>
              {dialogMode === "add" ? "Add Item" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ItemsShowLayout;