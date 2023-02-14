const invertTree = (node) => ({
  value: node.value,
  ...(node.left && { right: invertTree(node.left) }),
  ...(node.right && { left: invertTree(node.right) }),
});

const f = {
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
};

const svgns = 'http://www.w3.org/2000/svg';
const container = document.getElementById('cont');

const drawNode = (x, y, value = '') => {
  const circle = document.createElementNS(svgns, 'circle');
  circle.setAttributeNS(null, 'cx', x);
  circle.setAttributeNS(null, 'cy', y);
  circle.setAttributeNS(null, 'r', 20);
  circle.setAttributeNS(
    null,
    'style',
    'fill: #00ffff; stroke: black; stroke-width: 1px;'
  );
  const text = document.createElementNS(svgns, 'text');
  const l = value.toString().length;
  const off = l === 1 ? 4 : 9;

  text.setAttributeNS(null, 'x', x - off);
  text.setAttributeNS(null, 'y', y + 5);
  text.textContent = value;
  container.appendChild(circle);
  container.appendChild(text);
};

const drawLine = (x, y, x2, y2) => {
  const newLine = document.createElementNS(svgns, 'line');
  newLine.setAttribute('x1', x);
  newLine.setAttribute('y1', y);
  newLine.setAttribute('x2', x2);
  newLine.setAttribute('y2', y2);
  newLine.setAttribute('stroke', 'black');
  container.appendChild(newLine);
};
/*
const drawTree = (node, x, y, h, level = 1) => {
  //const t = Math.pow(2, (h-1)) * 20;
  //const u = Math.pow(2,h-(level+1));
  const dx = (h - level + 1) * 25;
  const dy = 50;
  if (node) {
    if (node.left) {
      drawLine(x, y, x - dx, y + dy);
      drawTree(node.left, x - dx, y + dy, h, level + 1);
    }
    if (node.right) {
      drawLine(x, y, x + dx, y + dy);
      drawTree(node.right, x + dx, y + dy, h, level + 1);
    }

    drawNode(x, y, node.value);
  }
};
*/
const calcHeight = (node, h = 1) => {
  let l = node.left ? calcHeight(node.left, h) : 0;
  let r = node.right ? calcHeight(node.right, h) : 0;

  return h + Math.max(l, r);
};

const flatTree = (node, x, y, h, level = 1, flat = []) => {
  const dx = (h - level + 1) * 25;
  const dy = 50;
  let left;
  let right;
  if (node.left) {
    left = { x: x - dx, y: y + dy, value: node.left.value };
    flatTree(node.left, left.x, left.y, h, level + 1, flat);
  }

  if (node.right) {
    right = { x: x + dx, y: y + dy, value: node.right.value };
    flatTree(node.right, right.x, right.y, h, level + 1, flat);
  }
  flat.unshift({
    value: node.value,
    x,
    y,
    ...(left && { left }),
    ...(right && { right }),
  });

  return flat;
};


//const h = calcHeight(f)
//drawTree(f, 250, 50, h);
//drawTree(invertTree(f), 250, 300, h);


const drawTree2 = (node, x = 250, y = 50) => {
  const h = calcHeight(node, 1);
  const ft = flatTree(node, x, y, h);
  ft.forEach((n) => {
    if (n.left) {
      drawLine(n.x, n.y, n.left.x, n.left.y);
    }
    if (n.right) {
      drawLine(n.x, n.y, n.right.x, n.right.y);
    }
    drawNode(n.x, n.y, n.value);
  });
};

drawTree2(f);
drawTree2(invertTree(f), 250, 300);
