<template>
  <q-page class="row items-center justify-evenly">
    <svg height="500" width="500" xmlns="http://www.w3.org/2000/svg">
      <rect height="499" width="499" stroke-width="1" fill="none" stroke="black"/>
      <tree-node @remove="remove"  @add="add" v-for="(value, key) in flatTree(tree, 250, 50, calcHeight(tree))" :key="key" :node="value" :radius="20"></tree-node>
    </svg>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TreeNode from 'src/components/TreeNode.vue';

type Node = {
  value: number;
  left?: Node;
  right?: Node;
}

export default defineComponent({
  name: 'IndexPage',
  components: { TreeNode },
  setup () {
    const tree = ref({
      value: 1,
      left: {
        value: 10,
        left: {
          value: 6,
          right: {
            value: 21,
          },
        },
        right: {
          value: 2,
          left: {
            value: 8,
          },
        },
      },
      right: {
        value: 7,
        right: {
          value: 5,
          left: {
            value: 30,
            right: {
              value: 33
            }
          }
        },
      },
    });
    return { tree, flat: ref<Node[]>([]) };
  },
  mounted() {
      this.flat =  this.flatTree(this.tree, 250, 50, calcHeight(this.tree))
  },
  methods: {
    add(node) {
      node['left'] = { value: 6 }
      console.log('add')
    },
    remove() {
      console.log('remove')
    },
    invertTree(node: Node): Node {
      return {
        value: node.value,
        ...(node.left && { right: this.invertTree(node.left) }),
        ...(node.right && { left: this.invertTree(node.right) }),
      }
    },    
    calcHeight(node: Node, h = 1): number {
      let l: number = node.left ? this.calcHeight(node.left, h) : 0;
      let r: number = node.right ? this.calcHeight(node.right, h) : 0;

      return h + Math.max(l, r);
    },
    flatTree (node: Node, x: number, y: number, h: number, level = 1, flat: (Node & { x: number, y: number})[] = []): Node[]  {
      const dx = (h - level + 1) * 25;
      const dy = 50;
      let left: { x: number, y: number, value: number } | undefined;
      let right: { x: number, y: number, value: number } | undefined;
      if (node.left) {
        left = { x: x - dx, y: y + dy, value: node.left.value };
        this.flatTree(node.left, left.x, left.y, h, level + 1, flat);
      }

      if (node.right) {
        right = { x: x + dx, y: y + dy, value: node.right.value };
        this.flatTree(node.right, right.x, right.y, h, level + 1, flat);
      }
      flat.unshift({
        value: node.value,
        x,
        y,
        ...(left !== undefined && { left }),
        ...(right !== undefined && { right }),
      });

      return flat;
    }
  }
});
</script>
