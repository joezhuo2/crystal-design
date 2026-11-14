import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react'
import styles from './GlassSurface.module.css'
import { encodeMaps } from './maps'

type OwnProps = {
  radius?: number
  mask?: string
  strength?: number
  bezel?: number
  children?: ReactNode
}

export type GlassSurfaceProps<T extends ElementType = 'div'> = OwnProps & { as?: T } & Omit<
    ComponentPropsWithoutRef<T>,
    keyof OwnProps | 'as'
  >

type Maps = { w: number; h: number; map: string; rim: string }

export function GlassSurface<T extends ElementType = 'div'>({
  as,
  radius = 24,
  mask,
  strength = 48,
  bezel = 18,
  className,
  style,
  children,
  ...rest
}: GlassSurfaceProps<T>) {
  const Tag: ElementType = as ?? 'div'
  const ref = useRef<HTMLElement>(null)
  const id = `cg-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const [maps, setMaps] = useState<Maps>()

  useEffect(() => {
    const el = ref.current
    if (!el || !/Chrome\//.test(navigator.userAgent)) return

    let image: HTMLImageElement | undefined
    const render = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      if (!w || !h) return
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      const sigma = bezel / 2
      ctx.filter = `blur(${sigma}px)`
      if (image) {
        const fit = Math.min(w / image.naturalWidth, h / image.naturalHeight)
        const iw = image.naturalWidth * fit
        const ih = image.naturalHeight * fit
        ctx.drawImage(image, (w - iw) / 2, (h - ih) / 2, iw, ih)
      } else {
        ctx.beginPath()
        ctx.roundRect(0, 0, w, h, Math.min(radius, w / 2, h / 2))
        ctx.fill()
      }
      try {
        const out = encodeMaps(ctx.getImageData(0, 0, w, h).data, w, h, sigma)
        const toUrl = (pixels: Uint8ClampedArray<ArrayBuffer>) => {
          ctx.putImageData(new ImageData(pixels, w, h), 0, 0)
          return canvas.toDataURL()
        }
        setMaps({ w, h, map: toUrl(out.map), rim: toUrl(out.rim) })
      } catch {
        setMaps(undefined)
      }
    }

    const observer = new ResizeObserver(render)
    if (mask) {
      image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => observer.observe(el)
      image.src = mask
    } else {
      observer.observe(el)
    }
    return () => observer.disconnect()
  }, [mask, radius, bezel])

  const shape = mask ? `url("${mask}") center / contain no-repeat` : undefined
  const refraction = maps && `url(#${id}) blur(var(--cg-blur, 1.5px)) saturate(1.4)`

  return (
    <Tag
      ref={ref}
      data-refract={maps ? '' : undefined}
      className={[styles.glass, className].filter(Boolean).join(' ')}
      style={{
        borderRadius: mask ? undefined : radius,
        mask: shape,
        WebkitMask: shape,
        ...(refraction && { backdropFilter: refraction }),
        ...style,
      }}
      {...rest}
    >
      {maps && (
        <>
          <svg className={styles.defs} aria-hidden="true">
            <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feImage
                href={maps.map}
                x="0"
                y="0"
                width={maps.w}
                height={maps.h}
                preserveAspectRatio="none"
                result="map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={strength}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>
          <span className={styles.rim} style={{ backgroundImage: `url(${maps.rim})` }} aria-hidden="true" />
        </>
      )}
      {children}
    </Tag>
  )
}
