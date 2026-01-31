import React, { useState, useMemo } from "react"
import {
    ChevronRight, Briefcase,
    ChevronsUpDown, Plus, Package, Search, FileText, Settings, PieChart, ClipboardList, Users2, Wrench, LayoutGrid
} from "lucide-react"

import {
    Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarGroup, SidebarGroupLabel, SidebarMenuSub,
    SidebarMenuSubItem, SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Avatar } from "@/components/ui/avatar"
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"

const menuData = [
    {
        title: "Menu",
        items: [
            {
                title: "Transactions",
                icon: Briefcase,
                subItems: [
                    { title: "Service Requests", path: "/service-requests" },
                    { title: "Estimates", path: "/estimates" },
                    { title: "Tickets", path: "/tickets" },
                    { title: "WorkOrders", path: "/workorders" },
                    { title: "Vehicle Inspections", path: "/vehicle-inspections" },
                    { title: "Invoices", path: "/invoices" },
                ],
            },
            {
                title: "Inventory",
                icon: Package,
                subItems: [
                    { title: "Purchase Orders", path: "/purchase-orders" },
                    { title: "Purchases", path: "/purchases" },
                    { title: "Purchase Returns", path: "/purchase-returns" },
                    { title: "Physical Stock Verifications", path: "/physical-stock-verifications" },
                ],
            },
            {
                title: "Lists",
                icon: ClipboardList, // Changed to ClipboardList for better visual variety
                subItems: [
                    { title: "Vehicles", path: "/vehicles" },
                    { title: "Vehicle Types", path: "/vehicle-types" },
                    { title: "Manage Make", path: "/manage-make" },
                    { title: "Manage Model", path: "/manage-model" },
                    { title: "Customers", path: "/customers" },
                    { title: "Customer Types", path: "/customer-types" },
                    { title: "Parts", path: "/parts" },
                    { title: "Part Brands", path: "/part-brands" },
                    { title: "Part Types", path: "/part-types" },
                    { title: "Manage Part UOM", path: "/manage-part-uom" },
                    { title: "Vendors", path: "/vendors" },
                    { title: "Repair Tasks", path: "/repair-tasks" },
                    { title: "Service Templates", path: "/service-templates" },
                    { title: "Service Plans", path: "/service-plans" },
                    { title: "Mechanics", path: "/mechanics" },
                ],
            },
            {
                title: "Miscellaneous",
                icon: ChevronsUpDown,
                subItems: [
                    { title: "Customer SignUp QR Code", path: "/customer-qr" },
                    { title: "All Notifications", path: "/notifications" },
                    { title: "Attendance", path: "/attendance" },
                    { title: "Default Taxes", path: "/default-taxes" },
                    { title: "Invoicing Charges", path: "/invoicing-charges" },
                ],
            },
        ],
    },
    {
        title: "Reports",
        items: [
            {
                title: "All Reports",
                icon: PieChart,
                subItems: [
                    { title: "Stock Ledger", path: "/reports/stock-ledger" },
                    { title: "Stock Summary", path: "/reports/stock-summary" },
                    { title: "Minimum Order Level Report", path: "/reports/min-order-level" },
                    { title: "Service History", path: "/reports/service-history" },
                    { title: "Comprehensive History", path: "/reports/comprehensive-history" },
                    { title: "Age of Vehicle Report", path: "/reports/vehicle-age" },
                    { title: "Work Order By Mechanic", path: "/reports/mechanic-work-orders" },
                    { title: "Vehicle By Type", path: "/reports/vehicle-by-type", badge: "Deprecated" },
                    { title: "Receivable Summary", path: "/reports/receivable-summary" },
                    { title: "Receivables By Customer", path: "/reports/receivable-by-customer" },
                    { title: "Purchases And Returns", path: "/reports/purchases-returns" },
                    { title: "Activity Logs", path: "/reports/activity-logs" },
                    { title: "Compliancy Due Date Report", path: "/reports/compliancy-due-date", badge: "Deprecated" },
                ],
            }
        ],
    },
    {
        title: "Settings",
        items: [
            {
                title: "Settings",
                icon: Settings,
                subItems: [
                    { title: "Workshop Settings", path: "/settings/workshop" },
                    { title: "Company Settings", path: "/settings/company" },
                ],
            },
            {
                title: "User Management",
                icon: Users2,
                subItems: [
                    { title: "Users", path: "/settings/users" },
                    { title: "Roles & Permissions", path: "/settings/roles-permissions" },
                ],
            }
        ],
    }
];
export default function AppSidebar() {
    const [searchTerm, setSearchTerm] = useState("")

    // 1. Highlighting Helper (Remains same)
    const HighlightText = ({ text, highlight }) => {
        if (!highlight.trim()) return <span>{text}</span>
        const parts = text.split(new RegExp(`(${highlight})`, "gi"))
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <mark key={i} className="bg-yellow-200 text-black rounded-sm px-0.5">{part}</mark>
                    ) : (
                        part
                    )
                )}
            </span>
        )
    }

    // 2. Filter Logic (Remains same)
    const filteredMenu = useMemo(() => {
        if (!searchTerm) return menuData
        return menuData.map(group => ({
            ...group,
            items: group.items.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.subItems.some(sub => sub.title.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        })).filter(group => group.items.length > 0)
    }, [searchTerm])

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    {/* Company Logo */}
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                                        <img
                                            src="/logo.png"
                                            alt="Company Logo"
                                            className="size-8 object-contain"
                                        />
                                    </div>

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Acme Inc</span>
                                        <span className="truncate text-xs text-muted-foreground">Active Workshop</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                align="start"
                                side="bottom"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="text-xs text-muted-foreground">Workshops</DropdownMenuLabel>

                                {/* Current Workshop Item */}
                                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                                    <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
                                        <Wrench className="size-4 shrink-0" />
                                    </div>
                                    <span className="flex-1">Acme Workshop South</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                                    <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
                                        <Wrench className="size-4 shrink-0" />
                                    </div>
                                    <span className="flex-1">Acme Workshop North</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                {/* Add New Action */}
                                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                                    <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
                                        <Plus className="size-4 shrink-0" />
                                    </div>
                                    <div className="font-medium text-muted-foreground">Add New Workshop</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    <div className="px-2 py-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search menu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 h-9 bg-sidebar-accent/50 border-none focus-visible:ring-1"
                            />
                        </div>
                    </div>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {filteredMenu.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    open={searchTerm.length > 0 ? true : undefined}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item.title}>
                                                <item.icon />
                                                <HighlightText text={item.title} highlight={searchTerm} />
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.subItems
                                                    .filter(sub => sub.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                                    .map((sub) => (
                                                        <SidebarMenuSubItem key={sub.title}>
                                                            <SidebarMenuSubButton asChild>
                                                                <Link to={sub.path} className="flex items-center justify-between w-full">
                                                                    <span className="truncate">
                                                                        <HighlightText text={sub.title} highlight={searchTerm} />
                                                                    </span>
                                                                    {sub.badge && (
                                                                        <span className="ml-auto text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200">
                                                                            {sub.badge}
                                                                        </span>
                                                                    )}
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg">
                                    <Avatar className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center">
                                        CN
                                    </Avatar>

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">shadcn</span>
                                        <span className="truncate text-xs">m@example.com</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56" side="top" align="end">
                                <DropdownMenuItem>Account</DropdownMenuItem>
                                <DropdownMenuItem>Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}