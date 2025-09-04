import React, { createContext, useContext, useState, useEffect } from 'react';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [inboundGoods, setInboundGoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize inventory data
  useEffect(() => {
    initializeInventory();
  }, []);

  const initializeInventory = async () => {
    try {
      // Mock initial inventory data
      const initialInventory = [
        {
          id: 1,
          sku: 'VEN-001',
          name: 'Steel Bolt M10',
          category: 'Fasteners',
          description: 'High-grade steel bolt, M10 threading',
          reorderLevel: 500,
          unitPrice: 2.50,
          warehouses: [
            { 
              name: 'Main Warehouse', 
              location: 'WH-A-001', 
              stock: 1200, 
              reserved: 150, 
              available: 1050 
            },
            { 
              name: 'Component Warehouse', 
              location: 'WH-C-001', 
              stock: 300, 
              reserved: 50, 
              available: 250 
            }
          ]
        },
        {
          id: 2,
          sku: 'VEN-002',
          name: 'Aluminum Sheet 1mm',
          category: 'Raw Materials',
          description: '1mm thick aluminum sheet, 4x8 feet',
          reorderLevel: 20,
          unitPrice: 45.00,
          warehouses: [
            { 
              name: 'Main Warehouse', 
              location: 'WH-B-012', 
              stock: 85, 
              reserved: 15, 
              available: 70 
            }
          ]
        },
        {
          id: 3,
          sku: 'VEN-003',
          name: 'Motor Assembly 3HP',
          category: 'Components',
          description: '3 Horsepower electric motor assembly',
          reorderLevel: 10,
          unitPrice: 275.00,
          warehouses: [
            { 
              name: 'Component Warehouse', 
              location: 'WH-C-005', 
              stock: 25, 
              reserved: 5, 
              available: 20 
            }
          ]
        },
        {
          id: 4,
          sku: 'VEN-004',
          name: 'Hydraulic Cylinder',
          category: 'Components',
          description: 'Double-acting hydraulic cylinder, 2" bore',
          reorderLevel: 15,
          unitPrice: 185.00,
          warehouses: [
            { 
              name: 'Main Warehouse', 
              location: 'WH-A-015', 
              stock: 8, 
              reserved: 2, 
              available: 6 
            },
            { 
              name: 'Component Warehouse', 
              location: 'WH-C-010', 
              stock: 12, 
              reserved: 0, 
              available: 12 
            }
          ]
        },
        {
          id: 5,
          sku: 'VEN-005',
          name: 'Stainless Steel Pipe 2"',
          category: 'Raw Materials',
          description: '2 inch diameter stainless steel pipe, 10 feet',
          reorderLevel: 50,
          unitPrice: 28.75,
          warehouses: [
            { 
              name: 'Main Warehouse', 
              location: 'WH-B-005', 
              stock: 0, 
              reserved: 0, 
              available: 0 
            }
          ]
        }
      ];

      // Mock inbound goods data
      const initialInboundGoods = [
        {
          id: 'IB-001',
          purchaseOrder: 'PO-2024-001',
          supplier: 'Steel Suppliers Inc',
          expectedDate: '2024-01-20',
          status: 'expected',
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', expectedQuantity: 1000, receivedQuantity: 0, warehouse: 'Main Warehouse' }
          ]
        },
        {
          id: 'IB-002',
          purchaseOrder: 'PO-2024-002',
          supplier: 'Aluminum Works Ltd',
          expectedDate: '2024-01-18',
          receivedDate: '2024-01-18',
          status: 'received',
          items: [
            { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', expectedQuantity: 50, receivedQuantity: 50, warehouse: 'Main Warehouse' }
          ]
        },
        {
          id: 'IB-003',
          purchaseOrder: 'PO-2024-003',
          supplier: 'Motor Manufacturers Co',
          expectedDate: '2024-01-16',
          status: 'overdue',
          items: [
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', expectedQuantity: 10, receivedQuantity: 0, warehouse: 'Component Warehouse' }
          ]
        },
        {
          id: 'IB-004',
          purchaseOrder: 'PO-2024-004',
          supplier: 'Steel Suppliers Inc',
          expectedDate: '2024-01-25',
          status: 'expected',
          items: [
            { sku: 'VEN-005', name: 'Stainless Steel Pipe 2"', expectedQuantity: 100, receivedQuantity: 0, warehouse: 'Main Warehouse' }
          ]
        }
      ];

      setInventory(initialInventory);
      setInboundGoods(initialInboundGoods);
      setLoading(false);
    } catch (error) {
      console.error('Failed to initialize inventory:', error);
      setLoading(false);
    }
  };

  // Update inventory when goods are received
  const updateInventoryFromReceipt = (inboundId, receivedItems) => {
    setInventory(prevInventory => {
      return prevInventory.map(item => {
        const receivedItem = receivedItems.find(ri => ri.sku === item.sku);
        if (!receivedItem) return item;

        return {
          ...item,
          warehouses: item.warehouses.map(warehouse => {
            if (warehouse.name === receivedItem.warehouse) {
              return {
                ...warehouse,
                stock: warehouse.stock + receivedItem.receivedQuantity,
                available: warehouse.available + receivedItem.receivedQuantity
              };
            }
            return warehouse;
          })
        };
      });
    });

    // Update inbound goods status
    setInboundGoods(prev => prev.map(inbound => 
      inbound.id === inboundId 
        ? {
            ...inbound,
            status: 'received',
            receivedDate: new Date().toISOString().split('T')[0],
            items: inbound.items.map(item => {
              const received = receivedItems.find(ri => ri.sku === item.sku);
              return received ? { ...item, receivedQuantity: received.receivedQuantity } : item;
            })
          }
        : inbound
    ));
  };

  // Reserve stock
  const reserveStock = (sku, warehouse, quantity) => {
    setInventory(prevInventory => {
      return prevInventory.map(item => {
        if (item.sku !== sku) return item;

        return {
          ...item,
          warehouses: item.warehouses.map(wh => {
            if (wh.name === warehouse) {
              return {
                ...wh,
                reserved: wh.reserved + quantity,
                available: wh.available - quantity
              };
            }
            return wh;
          })
        };
      });
    });
  };

  // Release reserved stock
  const releaseReservedStock = (sku, warehouse, quantity) => {
    setInventory(prevInventory => {
      return prevInventory.map(item => {
        if (item.sku !== sku) return item;

        return {
          ...item,
          warehouses: item.warehouses.map(wh => {
            if (wh.name === warehouse) {
              return {
                ...wh,
                reserved: Math.max(0, wh.reserved - quantity),
                available: wh.available + quantity
              };
            }
            return wh;
          })
        };
      });
    });
  };

  // Get item by SKU
  const getItemBySku = (sku) => {
    return inventory.find(item => item.sku === sku);
  };

  // Get warehouse stock for an item
  const getWarehouseStock = (sku, warehouseName) => {
    const item = getItemBySku(sku);
    if (!item) return null;
    return item.warehouses.find(wh => wh.name === warehouseName);
  };

  const value = {
    inventory,
    inboundGoods,
    loading,
    updateInventoryFromReceipt,
    reserveStock,
    releaseReservedStock,
    getItemBySku,
    getWarehouseStock,
    setInboundGoods
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
