<template>
  <q-page class="row items-center justify-evenly">
    <svg height="500" width="900" xmlns="http://www.w3.org/2000/svg">
      <rect height="499" width="899" stroke-width="1" fill="none" stroke="black"/>
      <tree-node @add-left="addLeft" @add-right="addRight" @remove-left="removeLeft"  @remove-right="removeRight" v-for="(value, key) in flatTree(tree, 250, 50, calcHeight(tree))" :key="key" :node="value" :radius="20"></tree-node>
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
    
    const calcHeight = (node: Node, h = 1): number => {
      let l: number = node.left ? calcHeight(node.left, h) : 0;
      let r: number = node.right ?  calcHeight(node.right, h) : 0;

      return h + Math.max(l, r);
    };
    const flatTree = (node: Node, x: number, y: number, h: number, level = 1, flat: (Node & { x: number, y: number})[] = []): Node[] => {
      const dx = (h - level + 1) * 25;
      const dy = 50;
      let left: { x: number, y: number, value: number } | undefined;
      let right: { x: number, y: number, value: number } | undefined;
      if (node.left) {
        left = { x: x - dx, y: y + dy, value: node.left.value };
        flatTree(node.left, left.x, left.y, h, level + 1, flat);
      }

      if (node.right) {
        right = { x: x + dx, y: y + dy, value: node.right.value };
        flatTree(node.right, right.x, right.y, h, level + 1, flat);
      }
      node['x'] = x;
      node['y'] = y;
      flat.unshift(node);
        //{
      //   value: node.value,
      //   x,
      //   y,
      //   ...(left !== undefined && { left }),
      //   ...(right !== undefined && { right }),
      // });

      return flat;
    };
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
    
    const flat =  ref<Node[]>(flatTree(tree.value, 250, 50, calcHeight(tree.value)))
    return { tree, flat, flatTree, calcHeight };
  },
  mounted() {
      //this.flat =  this.flatTree(this.tree, 250, 50, calcHeight(this.tree))
  },
  methods: {
    addLeft(node) {
      node['left'] = { value: 66}
    },
    addRight(node) {
      node['right'] = { value: 66}
    },
    removeLeft(node) {
      delete node['left']
    },
    removeRight(node) {
      delete node['right'] 
    },
    invertTree(node: Node): Node {
      return {
        value: node.value,
        ...(node.left && { right: this.invertTree(node.left) }),
        ...(node.right && { left: this.invertTree(node.right) }),
      }
    },    
    
  }
});
</script>
