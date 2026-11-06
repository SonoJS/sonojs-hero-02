"use client";
import { FaUser } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { copy } from "@/content/copy";
import { useMobile } from "@/hooks";
import { navItems, sampleCartItems } from "../constants";
import { useNavDropdown } from "../hooks";
import { getCartItemCount } from "../utils";
import AccountDropdown from "./AccountDropdown";
import CartDropdown from "./CartDropdown";
import MobileMenu from "./MobileMenu";
import NavIconButton from "./NavIconButton";
import NavLinks from "./NavLinks";

interface NavBarProps {
  bgColor?: string;
  textColor?: string;
  themeColor?: string;
}

export default function NavBar({
  textColor = "white",
  bgColor = "transparent",
  themeColor = "#82AF38",
}: NavBarProps) {
  const isMobile = useMobile();
  const {
    activeDropdown,
    toggleDropdown,
    closeDropdown,
    cartRef,
    accountRef,
    menuRef,
  } = useNavDropdown();
  const cartItemCount = getCartItemCount(sampleCartItems);

  return (
    <div
      className="flex fixed left-1/2 border-b border-white/25 -translate-x-1/2 top-0 w-full max-w-[1440px] items-center justify-between ps-[6.2%] pe-[5.5%] py-3 z-[100] select-none"
      style={{
        backgroundColor: bgColor,
        backdropFilter: "blur(8px)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="text-2xl font-bold" style={{ color: textColor }}>
        {copy.brand.name}
      </div>

      <NavLinks navItems={navItems} textColor={textColor} />

      {isMobile && (
        <div ref={menuRef}>
          <MobileMenu
            navItems={navItems}
            cartItemCount={cartItemCount}
            textColor={textColor}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
          />
        </div>
      )}

      <div className={`${isMobile ? "hidden" : "flex"} items-center gap-4`}>
        <div ref={isMobile ? undefined : accountRef} className="relative">
          <NavIconButton
            label={copy.nav.account}
            color={textColor}
            onClick={() => toggleDropdown("account")}
          >
            <FaUser size={20} />
          </NavIconButton>

          {!isMobile && activeDropdown === "account" && (
            <AccountDropdown themeColor={themeColor} isDesktop={true} />
          )}
        </div>

        <div ref={isMobile ? undefined : cartRef} className="relative">
          <NavIconButton
            label={copy.nav.cart}
            color={textColor}
            onClick={() => toggleDropdown("cart")}
            badgeCount={cartItemCount}
          >
            <GiShoppingBag size={20} />
          </NavIconButton>

          {!isMobile && activeDropdown === "cart" && (
            <CartDropdown
              cartItems={sampleCartItems}
              themeColor={themeColor}
              isDesktop={true}
            />
          )}
        </div>
      </div>

      {isMobile && activeDropdown === "cart" && (
        <div ref={cartRef}>
          <CartDropdown
            cartItems={sampleCartItems}
            themeColor={themeColor}
            isDesktop={false}
            onClose={closeDropdown}
          />
        </div>
      )}

      {isMobile && activeDropdown === "account" && (
        <div ref={accountRef}>
          <AccountDropdown themeColor={themeColor} isDesktop={false} />
        </div>
      )}
    </div>
  );
}
