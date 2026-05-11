"""
EchoEats — Analytics & Reporting Script (Python)
==================================================
Connects to MongoDB and generates business analytics reports:
  - Product inventory summary
  - Category-wise distribution & revenue potential
  - Order analytics (revenue, avg order value, top items)
  - Stock alerts for low-inventory items

Usage:
    pip install pymongo python-dotenv tabulate matplotlib
    python analytics_report.py

Author: EchoEats Dev Team
"""

import os
import sys
import io
from datetime import datetime
from collections import Counter, defaultdict
from pymongo import MongoClient
from dotenv import load_dotenv

# Fix Windows console encoding for special characters
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://127.0.0.1:27017/ecommerce')

# Low stock threshold
LOW_STOCK_THRESHOLD = 15


def connect_db():
    """Establish MongoDB connection."""
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        client.server_info()
        db_name = MONGO_URI.split('/')[-1].split('?')[0] if '/' in MONGO_URI else 'ecommerce'
        db = client[db_name]
        return client, db
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        sys.exit(1)


def product_inventory_report(db):
    """Generate product inventory summary."""
    products = list(db.products.find())
    
    if not products:
        print("⚠️  No products found in database.")
        return

    print("\n" + "=" * 60)
    print("  📦 PRODUCT INVENTORY REPORT")
    print("=" * 60)

    total_products = len(products)
    total_stock = sum(p.get("countInStock", 0) for p in products)
    avg_price = sum(p.get("price", 0) for p in products) / total_products
    min_price_product = min(products, key=lambda p: p.get("price", 0))
    max_price_product = max(products, key=lambda p: p.get("price", 0))

    print(f"\n  Total Products       : {total_products}")
    print(f"  Total Stock Units    : {total_stock}")
    print(f"  Average Price        : ${avg_price:.2f}")
    print(f"  Cheapest Item        : {min_price_product['name']} (${min_price_product['price']:.2f})")
    print(f"  Most Expensive Item  : {max_price_product['name']} (${max_price_product['price']:.2f})")

    # Full inventory table
    print(f"\n  {'ID':<5} {'Product Name':<25} {'Category':<12} {'Price':>8} {'Stock':>7} {'Value':>10}")
    print("  " + "-" * 70)
    
    total_inventory_value = 0
    for i, p in enumerate(products, 1):
        stock = p.get("countInStock", 0)
        price = p.get("price", 0)
        value = stock * price
        total_inventory_value += value
        stock_indicator = " ⚠️" if stock < LOW_STOCK_THRESHOLD else ""
        print(f"  {i:<5} {p['name']:<25} {p.get('category', 'N/A'):<12} ${price:>6.2f} {stock:>6}{stock_indicator} ${value:>8.2f}")
    
    print("  " + "-" * 70)
    print(f"  {'TOTAL':<44} {total_stock:>6}  ${total_inventory_value:>8.2f}")

    return products


def category_analysis(db):
    """Analyze product distribution by category."""
    products = list(db.products.find())
    
    if not products:
        return

    print("\n" + "=" * 60)
    print("  📊 CATEGORY-WISE ANALYSIS")
    print("=" * 60)

    # Group by category
    categories = defaultdict(lambda: {"count": 0, "total_stock": 0, "total_price": 0, "products": []})

    for p in products:
        cat = p.get("category", "Uncategorized")
        categories[cat]["count"] += 1
        categories[cat]["total_stock"] += p.get("countInStock", 0)
        categories[cat]["total_price"] += p.get("price", 0)
        categories[cat]["products"].append(p["name"])

    print(f"\n  {'Category':<15} {'Products':>10} {'Avg Price':>12} {'Total Stock':>13} {'Revenue Potential':>18}")
    print("  " + "-" * 70)

    for cat, data in sorted(categories.items()):
        avg_price = data["total_price"] / data["count"]
        revenue_potential = data["total_price"] * data["total_stock"] / data["count"]
        print(f"  {cat:<15} {data['count']:>10} ${avg_price:>10.2f} {data['total_stock']:>13} ${revenue_potential:>16.2f}")

    # Category distribution (text-based bar chart)
    print(f"\n  Category Distribution:")
    total = len(products)
    for cat, data in sorted(categories.items(), key=lambda x: x[1]["count"], reverse=True):
        bar_length = int((data["count"] / total) * 40)
        percentage = (data["count"] / total) * 100
        print(f"  {cat:<15} {'█' * bar_length} {percentage:.1f}% ({data['count']})")


def order_analytics(db):
    """Analyze order data for business insights."""
    orders = list(db.orders.find())
    
    print("\n" + "=" * 60)
    print("  💰 ORDER ANALYTICS")
    print("=" * 60)

    if not orders:
        print("\n  ⚠️  No orders found. Analytics will be available once customers place orders.")
        print("  📌 Tip: Use the EchoEats app to place test orders, then re-run this script.")
        return

    total_orders = len(orders)
    total_revenue = sum(o.get("totalPrice", 0) for o in orders)
    avg_order_value = total_revenue / total_orders if total_orders > 0 else 0
    paid_orders = sum(1 for o in orders if o.get("isPaid", False))
    delivered_orders = sum(1 for o in orders if o.get("isDelivered", False))

    print(f"\n  Total Orders         : {total_orders}")
    print(f"  Total Revenue        : ${total_revenue:.2f}")
    print(f"  Average Order Value  : ${avg_order_value:.2f}")
    print(f"  Paid Orders          : {paid_orders} ({(paid_orders/total_orders*100):.1f}%)")
    print(f"  Delivered Orders     : {delivered_orders} ({(delivered_orders/total_orders*100):.1f}%)")

    # Top ordered items
    item_counter = Counter()
    for order in orders:
        for item in order.get("orderItems", []):
            item_counter[item.get("name", "Unknown")] += item.get("qty", 1)

    if item_counter:
        print(f"\n  🏆 Top Ordered Items:")
        print(f"  {'Rank':<6} {'Item':<25} {'Times Ordered':>15}")
        print("  " + "-" * 48)
        for rank, (item, count) in enumerate(item_counter.most_common(5), 1):
            print(f"  {rank:<6} {item:<25} {count:>15}")

    # Payment methods breakdown
    payment_methods = Counter(o.get("paymentMethod", "Unknown") for o in orders)
    if payment_methods:
        print(f"\n  💳 Payment Methods:")
        for method, count in payment_methods.most_common():
            print(f"  {method:<20} : {count} orders ({count/total_orders*100:.1f}%)")


def stock_alerts(db):
    """Check for low-stock items and generate alerts."""
    products = list(db.products.find({"countInStock": {"$lt": LOW_STOCK_THRESHOLD}}))

    print("\n" + "=" * 60)
    print("  🚨 STOCK ALERTS (Threshold: < {} units)".format(LOW_STOCK_THRESHOLD))
    print("=" * 60)

    if not products:
        print("\n  ✅ All products are well-stocked. No alerts.")
        return

    print(f"\n  {'Product':<25} {'Current Stock':>15} {'Status':>12}")
    print("  " + "-" * 55)
    for p in products:
        stock = p.get("countInStock", 0)
        status = "🔴 CRITICAL" if stock < 5 else "🟡 LOW"
        print(f"  {p['name']:<25} {stock:>15} {status:>12}")

    print(f"\n  ⚠️  {len(products)} item(s) need restocking!")


def generate_report(db):
    """Generate a complete text-based report and save to file."""
    report_path = os.path.join(os.path.dirname(__file__), '..', 'analytics_report.txt')
    
    # Redirect print output to both console and file
    original_stdout = sys.stdout
    
    class DualOutput:
        def __init__(self, file, terminal):
            self.file = file
            self.terminal = terminal
        def write(self, text):
            self.terminal.write(text)
            self.file.write(text)
        def flush(self):
            self.terminal.flush()
            self.file.flush()

    with open(report_path, 'w', encoding='utf-8') as f:
        sys.stdout = DualOutput(f, original_stdout)

        print("\n" + "🍽️ " * 20)
        print(f"  ECHOЕATS — BUSINESS ANALYTICS REPORT")
        print(f"  Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("🍽️ " * 20)

        product_inventory_report(db)
        category_analysis(db)
        order_analytics(db)
        stock_alerts(db)

        print("\n" + "=" * 60)
        print("  📄 Report saved to: analytics_report.txt")
        print("=" * 60 + "\n")

        sys.stdout = original_stdout

    print(f"  ✅ Full report also saved to: {os.path.abspath(report_path)}")


def main():
    """Main entry point."""
    print("\n🚀 EchoEats Analytics Engine — Starting...")
    client, db = connect_db()
    print(f"✅ Connected to MongoDB: {MONGO_URI}")

    generate_report(db)

    client.close()
    print("🔒 Database connection closed.\n")


if __name__ == "__main__":
    main()
