<template>
    <line v-if="node?.left" :x1="node.x" :y1="node.y" :x2="node?.left.x" :y2="node.left.y" stroke="black" />
    <line v-if="node?.right" :x1="node.x" :y1="node.y" :x2="node?.right.x" :y2="node.right.y" stroke="black" />
    <circle :cx="node.x" :cy="node.y" :r="radius" fill="#00FFFF" stroke="black" />
    <foreignObject :x="node.x - 25" :y="node.y+5" width="25" height="25">
        <q-btn flat v-if="!node.left"  dense @click="$emit('add-left', node)" label="+"/>
        <q-btn flat v-else  dense @click="$emit('remove-left', node)" label="-"/>
    </foreignObject>
    <foreignObject :x="node.x+10" :y="node.y+5" width="25" height="25">
        <q-btn flat v-if="!node.right"  dense @click="$emit('add-right', node)" label="+"/>
        <q-btn flat v-else  dense @click="$emit('remove-right', node)" label="-"/>
    </foreignObject>
    <text :x="node.x" :y="node.y" class="small">{{ node.value }}</text>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type Node = {
  value: number;
  x?: number;
  y?: number;
  left?: Node;
  right?: Node;
}

export default defineComponent({
  name: 'TreeNode',
  emits:['add-left', 'add-right', 'remove-left', 'remove-right'],
  props: {
    node: {
      type: Object as PropType<Node>,
      required: true
    },
    radius: {
      type: Number as PropType<number>,
      required: true
    },
  },
  created() {
    // console.log(this.node)
    // console.log(this.radius)
  }
});
</script>
