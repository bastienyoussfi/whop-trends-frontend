# Claude.md - Project Guidelines

## ⚠️ NON-NEGOTIABLE RULES - READ FIRST

These rules are ABSOLUTE and have ZERO exceptions:

1. **TypeScript Strict Mode**: NO `any`, NO `unknown` - all types must be explicitly defined
2. **TanStack Router ONLY**: ALL routing must use TanStack Router (no React Router, no custom routing)
3. **TanStack Query ONLY**: ALL data fetching must use TanStack Query (no useEffect with fetch/axios)
4. **Internationalization**: ALL user-facing text must use translation keys (zero hardcoded strings)
5. **Single Responsibility**: Every component, function, and hook does ONE thing only
6. **SOLID Principles**: Follow all SOLID principles without exception
7. **Component Size**: Keep all components under 100 lines

**Violation of any of these rules means the code will be rejected.**

---

## Tech Stack
- **Framework**: Vite + React 18
- **Routing**: TanStack Router (ALL routing must use TanStack Router)
- **Data Fetching**: TanStack Query (ALL async data operations must use TanStack Query)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Language**: TypeScript (strict mode, NO `any`, NO `unknown`)
- **i18n**: react-i18next (ALL text must be translated)

---

## Core Principles

### 1. Component Architecture & Code Quality
- **Keep components under 100 lines** - split into smaller, focused components
- **Single Responsibility Principle** - each component, function, and hook does ONE thing well
- **SOLID Principles** - follow all SOLID principles religiously
- **DRY (Don't Repeat Yourself)** - extract and reuse common logic
- **Composition over inheritance** - build complex UIs from simple components
- **Co-locate related code** - keep styles, types, and logic close together
- **Pure functions when possible** - predictable, testable, maintainable code

### 2. File Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── features/        # Feature-specific components
│   └── layouts/         # Layout components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions & configs
├── types/               # TypeScript definitions
├── assets/              # App assets (images, svgs)
├── styles/              # Global styles & Tailwind config
├── locales/             # Translation files (en, fr, es, etc.)
│   ├── en/
│   │   ├── common.json
│   │   ├── errors.json
│   │   └── features/
│   └── fr/
└── pages/               # Page components
```

---

## Internationalization (i18n) - CRITICAL

### ⚠️ ABSOLUTE RULE: NO HARDCODED TEXT
**Every piece of user-facing text MUST be translated. Zero exceptions.**

### Core Principles
1. **Translation keys, not text** - Components accept `*Key` props, never raw text
2. **Leaf-level translation** - The `useTranslation()` hook is called at the component that renders text
3. **Namespaced keys** - Organize translations by feature/domain
4. **Type-safe keys** - Use TypeScript to validate translation keys exist

### Setup
```typescript
// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import fr from './locales/fr';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});
```

### Translation Key Structure
```json
// locales/en/common.json
{
  "common": {
    "actions": {
      "save": "Save",
      "cancel": "Cancel",
      "delete": "Delete",
      "edit": "Edit",
      "close": "Close"
    },
    "labels": {
      "email": "Email",
      "password": "Password",
      "name": "Name"
    },
    "validation": {
      "required": "This field is required",
      "invalidEmail": "Invalid email address"
    }
  },
  "features": {
    "users": {
      "title": "User Management",
      "createUser": "Create New User",
      "editUser": "Edit User",
      "deleteConfirm": "Are you sure you want to delete this user?"
    }
  }
}
```

### Component Patterns

#### ✅ CORRECT: Reusable Components with Translation Keys
```typescript
// Button.tsx - Reusable UI component
interface ButtonProps {
  labelKey: string;  // ✅ Key, not text
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ labelKey, variant, ...props }: ButtonProps) {
  const { t } = useTranslation(); // ✅ Translate at leaf level
  
  return (
    <button
      className={cn('px-4 py-2 rounded-lg', /* styles */)}
      {...props}
    >
      {t(labelKey)} {/* ✅ Translation happens here */}
    </button>
  );
}

// Usage
<Button labelKey="common.actions.save" onClick={handleSave} />
<Button labelKey="features.users.createUser" onClick={handleCreate} />
```

#### ✅ CORRECT: Optional Text with Translation Keys
```typescript
// Card.tsx - Component with optional title
interface CardProps {
  titleKey?: string;  // ✅ Optional translation key
  children: React.ReactNode;
}

export function Card({ titleKey, children }: CardProps) {
  const { t } = useTranslation();
  
  return (
    <div className="rounded-lg border bg-card">
      {titleKey && (
        <div className="p-6 font-semibold">
          {t(titleKey)} {/* ✅ Translate only if key provided */}
        </div>
      )}
      <div className="p-6 pt-0">{children}</div>
    </div>
  );
}

// Usage
<Card titleKey="features.users.title">
  <UserList />
</Card>
```

#### ✅ CORRECT: Lists with Translation Keys
```typescript
// Dropdown.tsx - Component with options
interface DropdownOption {
  value: string;
  labelKey: string;  // ✅ Each option has a translation key
}

interface DropdownProps {
  options: DropdownOption[];
  placeholderKey?: string;
  onChange: (value: string) => void;
}

export function Dropdown({ options, placeholderKey, onChange }: DropdownProps) {
  const { t } = useTranslation();
  
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholderKey ? t(placeholderKey) : undefined} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {t(option.labelKey)} {/* ✅ Translate at render */}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Usage
const statusOptions: DropdownOption[] = [
  { value: 'active', labelKey: 'common.status.active' },
  { value: 'inactive', labelKey: 'common.status.inactive' },
];

<Dropdown 
  options={statusOptions}
  placeholderKey="common.labels.selectStatus"
  onChange={handleChange}
/>
```

#### ✅ CORRECT: Forms with Translation Keys
```typescript
// TextField.tsx - Reusable input component
interface TextFieldProps {
  labelKey: string;
  placeholderKey?: string;
  errorKey?: string;  // ✅ Error messages also use keys
  value: string;
  onChange: (value: string) => void;
}

export function TextField({ 
  labelKey, 
  placeholderKey, 
  errorKey,
  value,
  onChange 
}: TextFieldProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {t(labelKey)} {/* ✅ Translated label */}
      </label>
      <input
        type="text"
        placeholder={placeholderKey ? t(placeholderKey) : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn('w-full px-3 py-2 rounded-md border')}
      />
      {errorKey && (
        <p className="text-sm text-error">
          {t(errorKey)} {/* ✅ Translated error */}
        </p>
      )}
    </div>
  );
}

// Usage
<TextField
  labelKey="common.labels.email"
  placeholderKey="common.placeholders.enterEmail"
  errorKey={errors.email ? 'common.validation.invalidEmail' : undefined}
  value={email}
  onChange={setEmail}
/>
```

#### ✅ CORRECT: Dynamic Content with Interpolation
```typescript
// Toast/Alert with dynamic values
interface ToastProps {
  messageKey: string;
  values?: Record<string, string | number>;  // ✅ Interpolation values
}

export function Toast({ messageKey, values }: ToastProps) {
  const { t } = useTranslation();
  
  return (
    <div className="rounded-lg bg-background p-4 shadow-lg">
      {t(messageKey, values)} {/* ✅ Pass values for interpolation */}
    </div>
  );
}

// Translation file
{
  "messages": {
    "userCreated": "User {{name}} has been created successfully",
    "itemsSelected": "{{count}} items selected"
  }
}

// Usage
<Toast 
  messageKey="messages.userCreated" 
  values={{ name: user.name }} 
/>
<Toast 
  messageKey="messages.itemsSelected" 
  values={{ count: selectedItems.length }} 
/>
```

#### ❌ WRONG: Hardcoded Text
```typescript
// ❌ NEVER DO THIS
export function Button({ label }: { label: string }) {
  return <button>{label}</button>;  // Raw text prop
}

<Button label="Save" />  // ❌ Hardcoded English text

// ❌ NEVER DO THIS
<button>Save</button>  // ❌ Hardcoded text directly

// ❌ NEVER DO THIS
<div>
  <h1>User Management</h1>  {/* ❌ No translation */}
</div>

// ❌ NEVER DO THIS
const options = [
  { value: 'active', label: 'Active' },  // ❌ Raw text
];
```

### Validation with TypeScript

```typescript
// types/i18n.ts - Type-safe translation keys
import en from '@/locales/en';

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? `${K}.${DeepKeys<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export type TranslationKey = DeepKeys<typeof en>;

// Now use in components for autocomplete and validation
interface ButtonProps {
  labelKey: TranslationKey;  // ✅ Type-safe, IDE autocomplete
}
```

### Accessibility with i18n

```typescript
// ✅ CORRECT: ARIA labels also translated
interface IconButtonProps {
  iconAriaLabelKey: string;  // ✅ ARIA label uses translation key
  icon: React.ReactNode;
  onClick: () => void;
}

export function IconButton({ iconAriaLabelKey, icon, onClick }: IconButtonProps) {
  const { t } = useTranslation();
  
  return (
    <button
      aria-label={t(iconAriaLabelKey)}  // ✅ Translated ARIA label
      onClick={onClick}
      className="p-2 rounded-md hover:bg-accent"
    >
      {icon}
    </button>
  );
}

// Usage
<IconButton
  iconAriaLabelKey="common.actions.close"
  icon={<X className="h-4 w-4" />}
  onClick={onClose}
/>
```

### Organization Strategy

```typescript
// Organize translations by domain/feature
locales/
├── en/
│   ├── common.json          // Shared across app
│   ├── errors.json          // All error messages
│   ├── validation.json      // Form validations
│   └── features/
│       ├── auth.json        // Authentication
│       ├── users.json       // User management
│       └── dashboard.json   // Dashboard
└── fr/
    └── ... (same structure)

// Load namespaced translations
const { t } = useTranslation('features/users');
t('title');  // Uses features.users.title
```

### Best Practices

#### Naming Conventions
```typescript
// ✅ DO: Use descriptive, hierarchical keys
"features.users.actions.createNew"
"common.validation.email.required"
"errors.api.unauthorized"

// ❌ AVOID: Flat, unclear keys
"button1"
"error_msg"
"txt_save"
```

#### Pluralization
```json
// Translation with plural forms
{
  "items": {
    "count_one": "{{count}} item",
    "count_other": "{{count}} items"
  }
}
```

```typescript
const { t } = useTranslation();
<p>{t('items.count', { count: items.length })}</p>
```

#### Context-Specific Keys
```typescript
// ✅ DO: Different contexts get different keys
{
  "actions": {
    "save": "Save",
    "saveChanges": "Save Changes",
    "saveAndContinue": "Save and Continue"
  }
}

// Each context uses the appropriate key
<Button labelKey="actions.save" />
<Button labelKey="actions.saveChanges" />
```

### i18n Checklist

Before committing:
- [ ] Zero hardcoded text in components
- [ ] All props use `*Key` suffix for translation keys
- [ ] `useTranslation()` called at leaf level (render time)
- [ ] ARIA labels use translation keys
- [ ] Error messages use translation keys
- [ ] Placeholder text uses translation keys
- [ ] All translation keys exist in locale files
- [ ] Type-safe translation keys (if implemented)

---

## TypeScript Guidelines

### ⚠️ ABSOLUTE RULE: NO `any`, NO `unknown`

**Every single type must be explicitly defined. Zero exceptions.**

### Strong Typing
```typescript
// ✅ DO: Use enums for fixed sets of values
enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Destructive = 'destructive',
}

// ✅ DO: Define clear interfaces for props
interface ButtonProps {
  variant: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

// ✅ DO: Use discriminated unions for complex states
type DataState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// ✅ DO: Define specific types for everything
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// ✅ DO: Type function parameters and returns explicitly
function processUser(user: User): ProcessedUser {
  return {
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
  };
}

// ❌ NEVER: Using 'any' or 'unknown'
type BadProps = {
  data: any; // ❌ FORBIDDEN
  value: unknown; // ❌ FORBIDDEN
  onClick: Function; // ❌ Too generic
};

// ✅ DO: Use specific types instead
type GoodProps = {
  data: UserData; // ✅ Specific type
  value: string | number | null; // ✅ Explicit union
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // ✅ Specific
};
```

### Type Organization
- Export all types from component files
- Create shared types in `types/` directory
- Use `type` for unions/intersections, `interface` for object shapes
- **NEVER use `any` or `unknown`** - always define explicit types
- If you don't know the type, create a proper type definition

---

## TanStack Router - REQUIRED FOR ALL ROUTING

### ⚠️ ABSOLUTE RULE: ALL routing must use TanStack Router

**Never use React Router, custom routing, or window.location. Zero exceptions.**

### Route Definition
```typescript
// ✅ DO: Define routes with proper typing
import { createFileRoute } from '@tanstack/react-router';

interface UserRouteParams {
  userId: string;
}

interface UserSearchParams {
  tab?: 'profile' | 'settings' | 'activity';
  page?: number;
}

export const Route = createFileRoute('/users/$userId')({
  // Validate params
  parseParams: (params): UserRouteParams => ({
    userId: params.userId,
  }),

  // Validate search params
  validateSearch: (search): UserSearchParams => ({
    tab: search.tab as 'profile' | 'settings' | 'activity' | undefined,
    page: Number(search.page) || undefined,
  }),

  // Load data before rendering (integrates with TanStack Query)
  loader: async ({ params, context }) => {
    const user = await context.queryClient.ensureQueryData({
      queryKey: ['user', params.userId],
      queryFn: () => fetchUser(params.userId),
    });
    return { user };
  },
});
```

### Route Component
```typescript
// ✅ DO: Use typed route hooks
import { useParams, useSearch, useNavigate } from '@tanstack/react-router';

function UserPage() {
  const { userId } = useParams({ from: '/users/$userId' }); // ✅ Typed params
  const { tab, page } = useSearch({ from: '/users/$userId' }); // ✅ Typed search
  const navigate = useNavigate();

  const handleTabChange = (newTab: 'profile' | 'settings' | 'activity') => {
    navigate({
      to: '/users/$userId',
      params: { userId },
      search: { tab: newTab, page },
    });
  };

  // Component logic...
}
```

### Navigation
```typescript
// ✅ DO: Use typed navigation
import { Link } from '@tanstack/react-router';

// Type-safe link with params
<Link
  to="/users/$userId"
  params={{ userId: user.id }}
  search={{ tab: 'profile' }}
>
  View Profile
</Link>

// ❌ NEVER: Manual navigation or React Router
<a href={`/users/${user.id}`}>Profile</a> // ❌ Not type-safe
```

### Best Practices
- Define all routes in the `routes/` directory using file-based routing
- Always validate params and search params
- Use loaders for data fetching (integrates with TanStack Query)
- Leverage type inference from route definitions
- Use `useNavigate()` for programmatic navigation
- Implement proper loading and error states

---

## TanStack Query - REQUIRED FOR ALL DATA FETCHING

### ⚠️ ABSOLUTE RULE: ALL async data operations must use TanStack Query

**Never use fetch/axios directly, useEffect for data fetching, or custom async logic. Zero exceptions.**

### Query Setup
```typescript
// ✅ DO: Define typed queries
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Define query keys as constants for reusability
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Define API functions with explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserFilters {
  role?: string;
  status?: 'active' | 'inactive';
}

async function fetchUser(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

async function fetchUsers(filters: UserFilters): Promise<User[]> {
  const params = new URLSearchParams(filters as Record<string, string>);
  const response = await fetch(`/api/users?${params}`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}
```

### Using Queries
```typescript
// ✅ DO: Use queries with proper typing
function UserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  if (isLoading) return <Skeleton />;
  if (isError) return <ErrorMessage error={error} />;

  // user is properly typed as User
  return <div>{user.name}</div>;
}

// ❌ NEVER: Direct fetch or useEffect for data
function BadUserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null); // ❌

  useEffect(() => {
    fetch(`/api/users/${userId}`) // ❌ Don't do this
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : null;
}
```

### Mutations
```typescript
// ✅ DO: Use mutations for write operations
interface CreateUserData {
  name: string;
  email: string;
}

async function createUser(data: CreateUserData): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
}

function CreateUserForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });

      // Or optimistically update
      queryClient.setQueryData(userKeys.detail(newUser.id), newUser);
    },
    onError: (error: Error) => {
      // Handle error
      toast.error(error.message);
    },
  });

  const handleSubmit = (data: CreateUserData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

### Optimistic Updates
```typescript
// ✅ DO: Implement optimistic updates for better UX
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (updatedUser) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: userKeys.detail(updatedUser.id) });

    // Snapshot previous value
    const previousUser = queryClient.getQueryData(userKeys.detail(updatedUser.id));

    // Optimistically update
    queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);

    // Return context with snapshot
    return { previousUser };
  },
  onError: (error, variables, context) => {
    // Rollback on error
    if (context?.previousUser) {
      queryClient.setQueryData(
        userKeys.detail(variables.id),
        context.previousUser
      );
    }
  },
  onSettled: (data, error, variables) => {
    // Always refetch after error or success
    queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
  },
});
```

### Dependent Queries
```typescript
// ✅ DO: Handle dependent queries properly
function UserPosts({ userId }: { userId: string }) {
  const { data: user } = useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUser(userId),
  });

  const { data: posts } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!user, // ✅ Only run when user is available
  });

  return <PostList posts={posts} />;
}
```

### Infinite Queries
```typescript
// ✅ DO: Use infinite queries for pagination
interface PostsPage {
  posts: Post[];
  nextCursor: string | null;
}

function InfinitePostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  return (
    <div>
      {data?.pages.map((page) =>
        page.posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

### Best Practices
- Always use query keys as constants for reusability
- Define all API functions with explicit types
- Handle loading, error, and success states
- Use `staleTime` and `gcTime` appropriately
- Implement optimistic updates for write operations
- Invalidate queries after mutations
- Use `enabled` option for dependent queries
- Leverage `useInfiniteQuery` for pagination
- Never use `useEffect` for data fetching

---

## Styling Guidelines

### Tailwind CSS v4 Best Practices

#### Color Variables
```css
/* ✅ DO: Define colors as CSS variables in globals.css */
@theme {
  --color-primary: oklch(0.6 0.2 250);
  --color-secondary: oklch(0.7 0.15 280);
  --color-accent: oklch(0.65 0.25 150);
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.2 0 0);
  
  /* Semantic colors */
  --color-success: oklch(0.7 0.2 140);
  --color-warning: oklch(0.75 0.2 60);
  --color-error: oklch(0.6 0.25 20);
  
  /* Dark mode variants */
  @media (prefers-color-scheme: dark) {
    --color-background: oklch(0.15 0 0);
    --color-foreground: oklch(0.95 0 0);
  }
}
```

```typescript
// ✅ DO: Use variables in components
<button className="bg-primary text-primary-foreground">
  Click me
</button>

// ❌ AVOID: Hardcoded colors
<button className="bg-blue-500 text-white">
  Click me
</button>
```

#### Responsive Design (Mobile-First)
```typescript
// ✅ DO: Start with mobile, add breakpoints upward
<div className="
  flex flex-col gap-4          /* mobile */
  sm:gap-6                     /* small tablets */
  md:flex-row md:gap-8         /* tablets/small laptops */
  lg:gap-12                    /* laptops */
  xl:gap-16                    /* desktops */
">

// ✅ DO: Use container queries when appropriate
<div className="@container">
  <div className="@lg:grid-cols-2">

// ❌ AVOID: Desktop-first approach
<div className="grid-cols-3 md:grid-cols-1"> // Wrong direction
```

#### Component Styling
```typescript
// ✅ DO: Use cn() utility for conditional classes
import { cn } from '@/lib/utils';

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        'hover:opacity-90 active:scale-95',
        {
          'bg-primary text-primary-foreground': variant === 'primary',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
        },
        className
      )}
      {...props}
    />
  );
}

// ❌ AVOID: String concatenation
className={`px-4 py-2 ${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}`}
```

---

## Component Patterns

### Composition Pattern
```typescript
// ✅ DO: Create composable components
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-lg border bg-card', className)}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('p-6', className)}>{children}</div>;
};

Card.Body = function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
};

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### Custom Hooks
```typescript
// ✅ DO: Extract reusable logic into hooks
function useAsync<T>(asyncFn: () => Promise<T>) {
  const [state, setState] = useState<DataState<T>>({ status: 'idle' });

  useEffect(() => {
    setState({ status: 'loading' });
    asyncFn()
      .then(data => setState({ status: 'success', data }))
      .catch(error => setState({ status: 'error', error: error.message }));
  }, []);

  return state;
}

// ✅ DO: Create domain-specific hooks
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

## Performance Optimization

### Code Splitting
```typescript
// ✅ DO: Lazy load routes and heavy components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const AdminPanel = lazy(() => import('@/pages/AdminPanel'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### Memoization
```typescript
// ✅ DO: Memoize expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.value - b.value),
  [items]
);

// ✅ DO: Memoize callbacks passed to children
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

// ❌ AVOID: Over-memoization of simple operations
const fullName = useMemo(() => `${first} ${last}`, [first, last]); // Overkill
```

---

## Accessibility

### ARIA and Semantic HTML
```typescript
// ✅ DO: Use semantic HTML and ARIA attributes
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  disabled={isLoading}
>
  <X className="h-4 w-4" aria-hidden="true" />
</button>

// ✅ DO: Ensure keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>

// ❌ AVOID: Non-semantic elements for interactive content
<div onClick={handleClick}>Click me</div> // Use <button> instead
```

### Focus Management
```typescript
// ✅ DO: Manage focus for modals and overlays
const dialogRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isOpen) {
    dialogRef.current?.focus();
  }
}, [isOpen]);

// ✅ DO: Visible focus indicators
// In your Tailwind config
<button className="focus-visible:ring-2 focus-visible:ring-primary">
```

---

## Error Handling

### Error Boundaries
```typescript
// ✅ DO: Implement error boundaries for sections
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

### User Feedback
```typescript
// ✅ DO: Provide clear error states
{state.status === 'error' && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{state.error}</AlertDescription>
  </Alert>
)}

// ✅ DO: Handle loading states
{state.status === 'loading' && (
  <Skeleton className="h-20 w-full" />
)}
```

---

## Testing Considerations

### Component Testability
```typescript
// ✅ DO: Write testable components with clear props
interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
  isEditable?: boolean;
}

// ✅ DO: Use data-testid for test selectors
<button data-testid="submit-button" onClick={handleSubmit}>
  Submit
</button>
```

---

## Code Organization Checklist

### Before Committing - CRITICAL REQUIREMENTS

#### TypeScript & Type Safety
- [ ] **ZERO `any` types anywhere in the code**
- [ ] **ZERO `unknown` types anywhere in the code**
- [ ] All props have explicit TypeScript interfaces
- [ ] All functions have explicit return types
- [ ] All variables have inferred or explicit types
- [ ] No `@ts-ignore` or `@ts-expect-error` comments

#### TanStack Requirements
- [ ] **ALL routing uses TanStack Router** (no React Router, no manual routing)
- [ ] **ALL data fetching uses TanStack Query** (no useEffect with fetch)
- [ ] Query keys defined as constants
- [ ] Route params and search params properly typed
- [ ] Loading and error states handled for all queries

#### Internationalization
- [ ] **ALL TEXT USES TRANSLATION KEYS** (zero hardcoded text)
- [ ] Props use `*Key` naming for translation keys
- [ ] Translations happen at leaf level (render time)
- [ ] ARIA labels use translation keys

#### Code Quality & Principles
- [ ] Components are under 100 lines
- [ ] Single Responsibility Principle - each component does ONE thing
- [ ] SOLID principles followed
- [ ] DRY principle - no repeated logic
- [ ] Pure functions when possible
- [ ] No magic numbers - use named constants
- [ ] Proper separation of concerns

#### Styling & Accessibility
- [ ] Colors use CSS variables, not hardcoded values
- [ ] Mobile-first responsive design implemented
- [ ] Accessibility attributes added (ARIA, semantic HTML)
- [ ] Focus management for interactive elements
- [ ] Keyboard navigation support

#### Clean Code
- [ ] No console.logs or debugging code
- [ ] Unused imports removed
- [ ] Unused variables removed
- [ ] Component is properly exported
- [ ] Proper error boundaries where needed

### Component Quality Standards
- [ ] Single responsibility - does one thing well
- [ ] Reusable - not overly coupled to specific use case
- [ ] Composable - works well with other components
- [ ] Predictable - same props = same output
- [ ] Accessible - keyboard navigation and screen reader support
- [ ] Testable - clear inputs and outputs
- [ ] Maintainable - easy to understand and modify

---

## Common Patterns

### Form Handling
```typescript
// ✅ DO: Use controlled components with TypeScript
interface FormData {
  email: string;
  password: string;
}

const [formData, setFormData] = useState<FormData>({
  email: '',
  password: '',
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};
```

### Modal/Dialog Pattern
```typescript
// ✅ DO: Use shadcn/ui Dialog with proper state management
export function UserDialog({ userId, open, onOpenChange }: UserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  );
}
```

---

## Anti-Patterns to Avoid

### ⚠️ CRITICAL - These will break code quality standards:

❌ **Using `any` or `unknown` types** - ALWAYS define explicit types
❌ **Using React Router or custom routing** - MUST use TanStack Router
❌ **Using fetch/axios in useEffect** - MUST use TanStack Query
❌ **Direct data fetching without TanStack Query** - ALL async operations use TanStack Query
❌ **HARDCODED TEXT ANYWHERE** - use translation keys
❌ **Props named `label`, `title`, `text`** - use `labelKey`, `titleKey`, `textKey`
❌ **Translating in parent components** - translate at leaf level only

### Code Quality Issues:

❌ Components over 100 lines - split into smaller pieces
❌ Multiple responsibilities in one component/function - single responsibility only
❌ Prop drilling more than 2 levels - use Context or composition
❌ Inline styles - use Tailwind classes
❌ Magic numbers - use named constants
❌ Mutating props directly
❌ Missing key props in lists
❌ Using index as key in dynamic lists
❌ Forgetting cleanup in useEffect
❌ Too many useState - consider useReducer
❌ Ignoring TypeScript errors with `@ts-ignore`
❌ Generic `Function` type - use specific function signatures
❌ Non-semantic HTML for interactive elements

---

## Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)
- [Vite Guide](https://vitejs.dev/guide)

---

**Remember**: Write code that is easy to read, maintain, and extend. Future you (and your team) will thank you!