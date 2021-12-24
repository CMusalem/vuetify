import { VBtn } from '@/components'
import { convertToUnit, defineComponent } from '@/util'

import { inject, PropType } from 'vue'

export const VDataTableHeaders = defineComponent({
  name: 'VDataTableHeaders',

  props: {
    rows: {
      type: Array as PropType<any[][]>,
      required: true,
    },
    rowHeight: {
      type: Number,
      required: true,
    },
    sticky: Boolean,
    sortBy: Array as PropType<any[]>,
  },

  emits: {
    sort: (x: any) => true,
  },

  setup (props, { slots, emit }) {
    const { toggleSort } = inject('v-data-table', {} as any)

    const getStickyStyles = (column: any, i: number) => {
      if (!props.sticky && !column.sticky) return null

      return {
        position: 'sticky',
        zIndex: column.sticky ? 4 : props.sticky ? 3 : undefined,
        left: column.sticky ? convertToUnit(column.stickyWidth ?? 0) : undefined,
        top: props.sticky ? `${props.rowHeight * i}px` : undefined,
      }
    }

    return () => {
      return props.rows.map((row, i) => (
        <tr class="v-data-table-regular__tr" role="row">
          {row.map(column => (
            <th
              class="v-data-table-regular__th"
              style={{
                ...column.style,
                width: column.width,
                'min-width': column.width,
                height: convertToUnit(props.rowHeight),
                ...getStickyStyles(column, i),
              }}
              role="columnheader"
              colspan={column.colspan}
              rowspan={column.rowspan}
              onClick={() => toggleSort(column.id)}
            >
              { column.name }
              { props.sortBy?.find(x => x.key === column.id) && (
                <VBtn icon="mdi-home" variant="plain" />
              ) }
            </th>
          ))}
        </tr>
      ))
    }
  },
})