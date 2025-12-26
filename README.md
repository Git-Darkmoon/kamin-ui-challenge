# Kamin Payments Platform

A modern, scalable payment management platform built with Next.js 16, TypeScript, and TailwindCSS for Kamin Studio's technical interview challenge.

## 🚀 Features

### Core Functionality

- ✅ **Payment List View** - Display payments with filtering and search
- ✅ **Create Payment Flow** - Modal-based payment creation with validation
- ✅ **Pagination** - Displays max 6 payments per page with navigation
- ✅ **Transaction Creation** - Users can create new payments that appear instantly in the list
- ✅ **Responsive Design** - Mobile-first approach with horizontal scrolling cards
- ✅ **Real-time Search** - Debounced search with instant results
- ✅ **State Management** - Server actions with `useActionState`
- ✅ **Form Validation** - Zod schema validation with React Hook Form
- ✅ **Toast Notifications** - Success/error feedback with Sonner
- ✅ **Loading States** - Proper loading indicators and skeletons
- ✅ **Error Handling** - Comprehensive error boundaries and validation

### Implementation Details

#### States Implemented:

- **Default State** → Clean form with proper validation
- **Loading State** → Loading spinner while payment is being created
- **Success State** → Toast notification and payment added to list
- **Error State** → Error messages for validation and network failures
- **Disabled State** → Form submission disabled when required fields are missing

#### Technical Highlights:

- 🎨 **Modern UI** - Clean, professional design matching Figma specs
- 📱 **Mobile Navigation** - Vaul drawer for smooth mobile menu
- 🔄 **Partial Pre-Rendering (PPR)** - Next.js 16 experimental features
- 🎯 **Type Safety** - Full TypeScript coverage
- 🧹 **Code Quality** - Biome for linting and formatting
- 📊 **Performance** - Optimized rendering and data fetching

## 📋 Prerequisites

- **Bun** >= 1.0.0 (recommended) or Node.js >= 18.0.0
- Git

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd kamin-payments
```

2. **Install dependencies**

```bash
bun install
```

3. **Run development server**

```bash
bun run dev
```

4. **Open in browser**

```
http://localhost:3000
```

## 📁 Project Structure

```
kamin-payments/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (dashboard)/              # Dashboard layout group
│   │   │   ├── layout.tsx            # Dashboard layout
│   │   │   └── pagos/                # Payments pages
│   │   │       ├── page.tsx          # Main page (PPR enabled)
│   │   │       └── loading.tsx       # Loading state
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   │
│   ├── components/
│   │   ├── ui/                       # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx            # Vaul wrapper
│   │   │   ├── badge.tsx
│   │   │   └── skeleton.tsx
│   │   │
│   │   ├── layouts/                  # Layout components
│   │   │   ├── sidebar.tsx           # Desktop sidebar
│   │   │   ├── mobile-nav.tsx        # Mobile drawer nav
│   │   │   └── header.tsx            # Mobile header
│   │   │
│   │   └── payments/                 # Feature components
│   │       ├── payments-list.tsx     # Main container
│   │       ├── payment-card.tsx      # Mobile card
│   │       ├── payments-table.tsx    # Desktop table
│   │       ├── payment-filters.tsx   # Search & filters
│   │       ├── payment-stats.tsx     # Statistics cards
│   │       ├── create-payment-modal.tsx
│   │       └── payment-form.tsx      # Form with validation
│   │
│   ├── lib/
│   │   ├── actions/
│   │   │   └── payment-actions.ts    # Server actions
│   │   ├── schemas/
│   │   │   └── payment-schema.ts     # Zod schemas
│   │   ├── utils/
│   │   │   ├── cn.ts                 # Tailwind merge
│   │   │   ├── format.ts             # Formatters
│   │   │   └── date.ts               # Date utilities
│   │   └── constants/
│   │       └── payment-constants.ts
│   │
│   ├── types/
│   │   ├── payment.ts                # Payment types
│   │   └── api.ts                    # API types
│   │
│   ├── data/
│   │   └── mock-payments.ts          # Mock data & repository
│   │
│   └── hooks/
│       └── use-debounce.ts           # Custom hooks
│
├── public/
├── biome.json                        # Biome configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── next.config.js                    # Next.js configuration
└── package.json
```

## 🎯 Key Design Decisions

### Architecture Patterns

#### 1. **Repository Pattern**

Abstracts data access layer for easy testing and future API integration:

```typescript
class PaymentRepository {
  async getPayments(): Promise<Payment[]>
  async createPayment(data): Promise<Payment>
}
```

#### 2. **Feature-Sliced Design**

Organized by features (payments) rather than technical layers:

- Better scalability
- Clear boundaries
- Easy to navigate

#### 3. **Server-First Architecture**

Leveraging Next.js 16 server actions:

- `useActionState` for form submissions
- Server-side validation
- Optimistic updates
- Automatic revalidation

### Design Patterns

#### 1. **Composition Pattern**

Components composed from smaller, reusable pieces:

```typescript
<PaymentsList>
  <PaymentFilters />
  <PaymentStatsComponent />
  <PaymentsTable /> // Desktop
  <PaymentCard /> // Mobile
</PaymentsList>
```

#### 2. **Strategy Pattern**

Different rendering strategies for mobile/desktop:

- Mobile: Horizontal scrolling cards
- Desktop: Traditional table
- Automatic switching at `md` breakpoint

#### 3. **Factory Pattern**

Payment creation logic encapsulated:

```typescript
async createPayment(data) {
  // Validation
  // Creation logic
  // Return standardized payment
}
```

### Performance Optimizations

#### 1. **Partial Pre-Rendering (PPR)**

Static shell with dynamic content:

```typescript
export const experimental_ppr = true
;<Suspense fallback={<Loading />}>
  <PaymentsData />
</Suspense>
```

#### 2. **Debounced Search**

Custom hook prevents excessive re-renders:

```typescript
const debouncedSearch = useDebounce(search, 300)
```

#### 3. **Code Splitting**

Modal loaded only when needed:

```typescript
const CreatePaymentModal = dynamic(() => import("./create-payment-modal"))
```

#### 4. **Optimized Filtering**

Memoized filter logic:

```typescript
const filteredPayments = React.useMemo(() => {
  // Filter logic
}, [payments, searchQuery])
```

## 🎨 Responsive Design

### Mobile (< 768px)

- **Navigation**: Vaul drawer menu
- **Payments**: Horizontal scrolling cards
- **Stats**: Stacked layout
- **Header**: Sticky with hamburger menu

### Desktop (≥ 768px)

- **Navigation**: Fixed sidebar
- **Payments**: Table layout
- **Stats**: Grid layout (3 columns)
- **No header**: Sidebar visible

## 📝 Form Validation

### Client-Side (Zod + React Hook Form)

```typescript
const schema = z.object({
  scheme: z.enum(["limit", "credit", "wallet"]),
  handle: z.string().regex(/^[a-zA-Z0-9-_]+$/),
  amount: z.number().positive().max(1000000000),
  wallet: z.string().min(1),
})
```

### Server-Side (Server Actions)

```typescript
const validationResult = schema.safeParse(data);
if (!validationResult.success) {
  return { success: false, errors: /* ... */ };
}
```

## 🔄 State Management Strategy

### Form State

- **React Hook Form** - Uncontrolled components
- Local state only
- No global state pollution

### Server State

- **useActionState** - Server action state
- Handles: idle, pending, success, error
- Automatic revalidation

### UI State

- **useState** - Local component state
- Modal open/close
- Search queries
- Filters

## 🧪 Testing Strategy

### Unit Tests

```bash
bun test
```

Test coverage includes:

- Validation schemas
- Utility functions
- Format functions
- Date utilities

### Integration Tests

- Form submission flows
- Search and filtering
- Modal interactions
- Responsive behavior

### E2E Tests

- Payment creation flow
- Navigation
- Mobile drawer
- Table interactions

## 🚀 Deployment

### Build for Production

```bash
bun run build
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Deployment Platforms

- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - Full support for Next.js
- **Railway** - Simple deployment
- **Docker** - Custom hosting

## 📊 Performance Metrics

Target metrics:

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

Achieved through:

- Server-side rendering
- Code splitting
- Image optimization
- Font optimization

## 🔒 Security Considerations

- ✅ Server-side validation
- ✅ Input sanitization
- ✅ CSRF protection (Next.js built-in)
- ✅ XSS prevention
- ✅ Type safety

## 🎓 Learning Resources

### Technologies Used

- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Sonner](https://sonner.emilkowal.ski)
- [Vaul](https://vaul.emilkowal.ski)
- [Biome](https://biomejs.dev)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run check` for linting
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a technical assessment.

## 👤 Author

Created for Kamin technical assessment by [Your Name]

---

## 🎯 Assessment Completion Checklist

### Required Features

- ✅ Payments list view with data
- ✅ Primary action to issue payment
- ✅ Modal for payment creation flow
- ✅ Responsive table design
- ✅ Functional search bar
- ✅ Functional filters
- ✅ Mock data implementation

### States Implemented

- ✅ Default state (empty form)
- ✅ Loading state (payment creation)
- ✅ Success state (toast + table update)
- ✅ Error state (validation + network errors)
- ✅ Disabled state (invalid form)

### Technical Requirements

- ✅ Next.js 16
- ✅ TypeScript
- ✅ TailwindCSS
- ✅ Biome
- ✅ Bun

### Best Practices

- ✅ Design Patterns (Repository, Factory, Strategy)
- ✅ Architectural Patterns (Feature-Sliced, Server-First)
- ✅ DRY (Don't Repeat Yourself)
- ✅ KISS (Keep It Simple, Stupid)
- ✅ YAGNI (You Aren't Gonna Need It)
- ✅ Performance optimization (PPR, code splitting)
- ✅ Accessibility (ARIA labels, keyboard nav)
- ✅ Scalability (modular structure)
- ✅ Maintainability (clean code, comments)

---

**Ready for deployment and evaluation! 🚀**
