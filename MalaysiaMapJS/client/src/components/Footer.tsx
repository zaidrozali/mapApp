import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const majorStates = [
    "Selangor", "Perak", "Penang", "Johor", "Kedah", "Pahang"
  ];

  const categories = [
    "Infrastructure", "Development", "Social Programs", "Economic Initiatives"
  ];

  return (
    <footer className="border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Major States</h3>
            <div className="flex flex-col gap-2">
              {majorStates.map((state) => (
                <Link key={state} href={`/states/${state.toLowerCase()}`}>
                  <Button
                    variant="ghost"
                    className="justify-start w-full"
                    data-testid={`link-footer-state-${state.toLowerCase()}`}
                  >
                    {state}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Project Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <Link key={category} href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Button
                    variant="ghost"
                    className="justify-start w-full"
                    data-testid={`link-footer-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {category}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact & Information</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about">
                <Button variant="ghost" className="justify-start w-full" data-testid="link-footer-about">
                  About Us
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="justify-start w-full" data-testid="link-footer-contact">
                  Contact
                </Button>
              </Link>
              <Link href="/privacy">
                <Button variant="ghost" className="justify-start w-full" data-testid="link-footer-privacy">
                  Privacy Policy
                </Button>
              </Link>
              <Link href="/accessibility">
                <Button variant="ghost" className="justify-start w-full" data-testid="link-footer-accessibility">
                  Accessibility
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Malaysian State Projects Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
