import { cybersecurityItems } from "@/data/cybersecurity";
import type { CyberItem } from "@/types/cybersecurity";

export interface CyberTreeNode extends CyberItem {
  children: CyberTreeNode[];
}

export function buildCyberTree(
  items: CyberItem[] = cybersecurityItems,
): CyberTreeNode[] {
  const nodes = new Map<string, CyberTreeNode>();

  for (const item of items) {
    nodes.set(item.id, {
      ...item,
      children: [],
    });
  }

  const roots: CyberTreeNode[] = [];

  for (const node of nodes.values()) {
    if (node.parentId === null) {
      roots.push(node);
      continue;
    }

    const parent = nodes.get(node.parentId);

    if (parent) {
      parent.children.push(node);
    }
  }

  const sortNodes = (items: CyberTreeNode[]): CyberTreeNode[] =>
    items
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        ...item,
        children: sortNodes(item.children),
      }));

  return sortNodes(roots);
}

export const cyberTree = buildCyberTree();

export const cyberTrackableItems = cybersecurityItems.filter(
  (item) => item.type === "topic" || item.type === "subtopic",
);
