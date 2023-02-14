<template>
  <q-page class="row">
    <svg height="300" :width="width" xmlns="http://www.w3.org/2000/svg">
      <rect height="298" :width="width-2" stroke-width="1" fill="none" stroke="black"/>
      <tree-node 
        v-for="(value, key) in flat" 
        :key="key" 
        :node="value" 
        :radius="20"
        @add-left="addLeft"
        @add-right="addRight"
        @remove-left="removeLeft"
        @remove-right="removeRight"
      ></tree-node>
    </svg>
    <svg height="300" :width="width" xmlns="http://www.w3.org/2000/svg">
      <rect height="298" :width="width-2" stroke-width="1" fill="none" stroke="black"/>  
      <tree-node 
        v-for="(value, key) in invertFlat" 
        :key="key" 
        :node="value" 
        :radius="20"
      ></tree-node>
    </svg>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, pushScopeId, ref, computed } from 'vue';
import TreeNode from 'src/components/TreeNode.vue';

type Node = {
  value: number;
  x?: number;
  y?: number;
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
    const flatTree = (node: Node, x: number, y: number, h: number, level = 1, flat: Node[] = []): Node[] => {
      const dx = Math.pow(2, (h-level)) * 25;
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
    
    const getWidth = (n: Node) => {
      const h = calcHeight(n);
      const w = Math.pow(2, h) * 50;
      return w;
    };

    
    const invertTree = (node: Node): Node => {
      return {
        value: node.value,
        ...(node.left && { right: invertTree(node.left) }),
        ...(node.right && { left: invertTree(node.right) }),
      }
    };

    return { 
      tree, 
      flat: computed(() => flatTree(tree.value, getWidth(tree.value) / 2, 50, calcHeight(tree.value))), 
      invertFlat: computed(() => flatTree(invertTree(tree.value), getWidth(tree.value) / 2, 50, calcHeight(tree.value))), 
      width: computed(() => getWidth(tree.value)), 
      flatTree,
      calcHeight 
    };
  },
  methods: {
    addLeft(node: Node) {
      node['left'] = { value: 66 }
    },
    addRight(node: Node) {
      node['right'] = { value: 66 }
    },
    removeLeft(node: Node) {
      delete node['left']
    },
    removeRight(node: Node) {
      delete node['right']
    }   
    
  }
});
</script>
