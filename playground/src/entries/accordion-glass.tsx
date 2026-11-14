import { GlassAccordion, GlassAccordionItem } from '@crystal-design/accordion-glass'
import { glassAttrs, glassControls, glassProps, type Entry } from '../entry'

export const entry: Entry = {
  id: 'accordion-glass',
  name: 'Glass Accordion',
  pkg: '@crystal-design/accordion-glass',
  category: 'Surfaces',
  description: 'Collapsible sections in one glass container.',
  controls: [...glassControls(18, 30), { key: 'multiple', label: 'Allow multiple', type: 'toggle', value: false }],
  render: (v) => (
    <GlassAccordion {...glassProps(v)} multiple={v.multiple as boolean} style={{ width: 320, maxWidth: 'calc(100% - 32px)' }}>
      <GlassAccordionItem title="What is it?">A frosted container whose sections open with a smooth height animation.</GlassAccordionItem>
      <GlassAccordionItem title="Is it accessible?">Yes, each header is a button with aria-expanded, and closed content is inert.</GlassAccordionItem>
      <GlassAccordionItem title="Can several be open?">Turn on the multiple prop.</GlassAccordionItem>
    </GlassAccordion>
  ),
  code: (v) => `import { GlassAccordion, GlassAccordionItem } from '@crystal-design/accordion-glass'

<GlassAccordion${v.multiple ? ' multiple' : ''}${glassAttrs(entry, v)}>
  <GlassAccordionItem title="What is it?">A frosted container.</GlassAccordionItem>
  <GlassAccordionItem title="Is it accessible?">Yes.</GlassAccordionItem>
</GlassAccordion>`,
}
