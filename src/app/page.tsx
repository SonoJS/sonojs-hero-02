"use client";
import { AnimatedBackground, BlurredBackground } from "@/components";
import { copy } from "@/content/copy";
import { JuiceCarousel } from "@/features/carousel";
import { IceCubes } from "@/features/ice-cubes";
import { useLandingPage, WaterWaveStage } from "@/features/landing";
import { NavBar } from "@/features/navigation";
import {
  ProductInfo,
  ProductLogo,
  ScrollDownButton,
  SizeSelector,
  sizeOptions,
} from "@/features/product-showcase";

export default function HomePage() {
  const { juiceId, theme, isMobile, iceCubesProps, handleCanChange } =
    useLandingPage();

  return (
    <main className="relative w-full max-w-[1440px] mx-auto h-[100dvh] shadow-2xl select-none border-x border-white/20 overflow-hidden">
      <IceCubes {...iceCubesProps} />
      <NavBar textColor="white" themeColor={theme.mainBgColor} />
      <WaterWaveStage isMobile={isMobile}>
        <AnimatedBackground backgroundColor={theme.mainBgColor} />

        <div
          className="absolute inset-0 z-0 bg-black/5 pointer-events-none"
          style={{ backdropFilter: "blur(0px)" }}
        />

        <div
          className={`max-w-[1440px] ${
            isMobile ? "px-4" : "pe-5 ps-[70px]"
          } h-full max-h-[1080px] m-auto relative`}
        >
          <BlurredBackground color={theme.blurColor} />

          <ProductLogo
            isMobile={isMobile}
            text={copy.brand.wordmark}
            color="white"
          />

          <div
            className={`${
              isMobile ? "relative" : "absolute"
            } top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full z-50`}
          >
            <JuiceCarousel
              onCanChange={handleCanChange}
              enableScrollNavigation={true}
            />
          </div>

          {!isMobile && (
            <SizeSelector
              sizes={sizeOptions}
              selectedColor={theme.buttonBgColor}
              unselectedColor={theme.mainBgColor}
              textColor={theme.mainBgColor}
              selectedTextColor="white"
            />
          )}

          <ProductInfo
            juiceId={juiceId}
            buttonBgColor={theme.buttonBgColor}
            buttonTextColor={theme.buttonTextColor}
          />

          <ScrollDownButton
            textColor="white"
            isMobile={isMobile}
            themeColor={theme.mainBgColor}
          />
        </div>
      </WaterWaveStage>
    </main>
  );
}
