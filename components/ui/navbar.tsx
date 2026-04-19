"use client";

import {
  ListMinus,
  ShoppingBasket,
  MapPin,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

function Navbar() {
  const { items, removeItem, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const phoneNumber = "6285935391713"; // Dummy number
    let message = "Hello, I want to order:\n\n";
    items.forEach((item) => {
      message += `- ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString("id-ID")}\n`;
    });
    message += `\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}\n\nPlease process my order.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center mt-5 relative">
          <div className="flex justify-start items-center gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-10 w-10 rounded-full" variant="outline">
                  <ListMinus size={30} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Home</DropdownMenuItem>
                <DropdownMenuItem>Categories</DropdownMenuItem>
                <DropdownMenuItem>About Us</DropdownMenuItem>
                <DropdownMenuItem>Contact</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:flex gap-1">
              <MapPin size={14} />
              <p className="text-xs font-normal text-muted-foreground">
                Bandung, Indonesia
              </p>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <a href="/" className="text-lg font-semibold font-serif">
              Croissants.
            </a>
          </div>
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="h-10 w-10 rounded-full relative"
                  variant="outline"
                >
                  <ShoppingBasket />
                  {mounted && totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto mt-4 -mx-6 px-6">
                  {mounted && items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <ShoppingBasket size={48} className="mb-4 opacity-20" />
                      <p>Your cart is empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mounted &&
                        items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 items-center border-b border-border p-4"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md bg-muted"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">
                                {item.name}
                              </h4>
                              <p className="text-sm font-medium">
                                Rp {item.price.toLocaleString("id-ID")}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                >
                                  <Minus size={12} />
                                </Button>
                                <span className="text-xs font-medium w-4 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  <Plus size={12} />
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <SheetFooter className="mt-auto border-t border-border pt-4 block">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-lg">
                      Rp {mounted ? totalPrice.toLocaleString("id-ID") : 0}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!mounted || items.length === 0}
                    onClick={handleCheckout}
                  >
                    Checkout via WhatsApp
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
