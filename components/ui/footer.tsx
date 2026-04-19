import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted py-10 mt-20">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Croissant.</h3>
            <p className="text-muted-foreground text-sm">
              Freshly baked artisanal breads and pastries delivered straight to your door. Taste the difference of handmade quality.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Jl. Braga No. 123, Bandung, Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold w-4 text-center">@</span>
                <span>@croissant.bakery</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Monday - Friday: 07:00 - 20:00</li>
              <li>Saturday - Sunday: 08:00 - 21:00</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Croissant Bakery. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
