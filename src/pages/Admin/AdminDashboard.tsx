import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminDashboardNavbar from "./AdminDashboardNavbar";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { pathname } = useLocation();

  const shouldHideNavbar =
    pathname === "/seller-dashboard/invoice-form" ||
    pathname === "/seller-dashboard/create-promotion" ||
    pathname === "/seller-dashboard/inquiries-details";

  const shouldHideSidebar = () => {
    const hideExact = [
      "/seller-dashboard/add-product",
      "/seller-dashboard/all-products",
      "/seller-dashboard/all-orders",
      "/seller-dashboard/inquiries-details",
      "/seller-dashboard/invoice-form",
      "/seller-dashboard/create-promotion",
    ];

    const pathnameSegments = pathname.split("/");

    const isProductDetails =
      pathname.startsWith("/seller-dashboard/all-products/") &&
      pathnameSegments.length === 4;

    const isOrderDetails =
      pathname.startsWith("/seller-dashboard/all-orders/") &&
      pathnameSegments.length === 4;

    const isBuyerProfile =
      pathname.startsWith("/seller-dashboard/all-orders/") &&
      pathnameSegments.length === 5 &&
      pathname.endsWith("/buyer-profile");

    return (
      hideExact.includes(pathname) ||
      isProductDetails ||
      isOrderDetails ||
      isBuyerProfile
    );
  };

  useEffect(() => {
    const pathnameSegments = pathname.split("/");

    const isDetailView =
      (pathname.startsWith("/seller-dashboard/all-products/") &&
        pathnameSegments.length === 4) ||
      (pathname.startsWith("/seller-dashboard/all-orders/") &&
        pathnameSegments.length === 4) ||
      (pathname.startsWith("/seller-dashboard/all-orders/") &&
        pathnameSegments.length === 5 &&
        pathname.endsWith("/buyer-profile"));

    const isAddProduct = pathname === "/seller-dashboard/add-product";
    const isAllProduct = pathname === "/seller-dashboard/all-products";
    const isAllOrder = pathname === "/seller-dashboard/all-orders";
    const isInquiries = pathname === "/seller-dashboard/inquiries-details";
    const isInvoice = pathname === "/seller-dashboard/invoice-form";

    setIsSidebarOpen(
      isDetailView ||
        isAddProduct ||
        isAllProduct ||
        isAllOrder ||
        isInquiries ||
        isInvoice
    );
  }, [pathname]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Fixed on Desktop */}
      {!shouldHideSidebar() && (
        <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-30 border-r border-gray-200 bg-white">
          <AdminSidebar />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-200 ease-in-out ${
          !shouldHideSidebar() ? "lg:ml-64" : ""
        }`}
      >
        {/* Navbar */}
        {!shouldHideNavbar && (
          <div className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
            <AdminDashboardNavbar
              onMobileMenuToggle={handleMobileMenuToggle}
              notificationCount={3}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
        )}

        {/* Mobile Sidebar */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <div className="hidden" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <AdminSidebar onItemClick={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Scrollable Page Content */}
        <main
          className={`flex-1 overflow-y-auto mt-16 ${
            isSidebarOpen ? "pt-4 md:pt-10" : "p-4 md:p-10"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
