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
import { encodeMap, encodeRim } from './maps'

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

type Maps = { w: number; h: number; map: string; rim?: string }

export function GlassSurface<T extends ElementType = 'div'>({
  as,
  radius = 6,
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
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const cw = Math.round(w * ratio)
      const ch = Math.round(h * ratio)
      const canvas = document.createElement('canvas')
      canvas.width = cw
      canvas.height = ch
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      const alpha = (sigma: number) => {
        ctx.clearRect(0, 0, cw, ch)
        ctx.filter = `blur(${sigma}px)`
        if (image) {
          const fit = Math.min(cw / image.naturalWidth, ch / image.naturalHeight)
          const iw = image.naturalWidth * fit
          const ih = image.naturalHeight * fit
          ctx.drawImage(image, (cw - iw) / 2, (ch - ih) / 2, iw, ih)
        } else {
          ctx.beginPath()
          ctx.roundRect(0, 0, cw, ch, Math.min(radius, w / 2, h / 2) * ratio)
          ctx.fill()
        }
        return ctx.getImageData(0, 0, cw, ch).data
      }
      const softSigma = (bezel / 2) * ratio
      const sharpSigma = 0.75 * ratio
      try {
        const toUrl = (pixels: Uint8ClampedArray<ArrayBuffer>) => {
          ctx.putImageData(new ImageData(pixels, cw, ch), 0, 0)
          return canvas.toDataURL()
        }
        const map = toUrl(encodeMap(alpha(softSigma), cw, ch, softSigma))
        const rim = image && toUrl(encodeRim(alpha(sharpSigma), cw, ch, sharpSigma))
        setMaps({ w, h, map, rim })
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
          {maps.rim && (
            <span className={styles.rim} style={{ backgroundImage: `url(${maps.rim})` }} aria-hidden="true" />
          )}
        </>
      )}
      {children}
    </Tag>
  )
}
