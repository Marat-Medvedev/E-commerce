# 🧪 Error and Fallback States Testing Guide

## 🚀 How to Test

1. **Navigate to the test page:**

   ```
   http://localhost:3000/catalog/test
   ```

2. **Use the State Tester panel** (top-right corner) to switch between different states

## 📋 Test States Available

### ✅ **Normal State**

- **What it shows:** Regular product grid with mock data
- **Purpose:** Verify normal functionality works
- **Expected:** 2 test products displayed

### ⏳ **Loading State**

- **What it shows:** Skeleton loading cards
- **Purpose:** Test loading UI and performance
- **Expected:** 8 skeleton cards, infinite loading

### ❌ **Error States**

#### **Generic Error**

- **What it shows:** "Failed to load products" message
- **Purpose:** Test basic error handling
- **Expected:** Red error message with "Try Again" button

#### **Network Error**

- **What it shows:** "Network request failed" message
- **Purpose:** Test network connectivity issues
- **Expected:** Network-specific error message

#### **Timeout Error**

- **What it shows:** "Request timeout" message
- **Purpose:** Test timeout handling
- **Expected:** Timeout-specific error message

#### **Server Error (500)**

- **What it shows:** "Internal server error (500)" message
- **Purpose:** Test server-side errors
- **Expected:** Server error message with appropriate guidance

#### **Not Found (404)**

- **What it shows:** "Products not found (404)" message
- **Purpose:** Test resource not found scenarios
- **Expected:** 404-specific error message

### 📭 **Empty State**

- **What it shows:** "No products found" message
- **Purpose:** Test empty results handling
- **Expected:** Empty state with clear filters option

## 🎯 **What to Test**

### **1. Visual States**

- [ ] Loading skeletons appear correctly
- [ ] Error messages are clear and helpful
- [ ] Empty state provides actionable guidance
- [ ] All states have proper spacing and layout

### **2. Interactive Elements**

- [ ] "Try Again" button works in error states
- [ ] "Clear Filters" button works in empty state
- [ ] "Reset Test" button returns to normal state
- [ ] Search input works in all states

### **3. Error Handling**

- [ ] Different error types show appropriate messages
- [ ] Error messages are user-friendly
- [ ] Recovery actions are available
- [ ] No JavaScript errors in console

### **4. Performance**

- [ ] Loading states don't cause layout shifts
- [ ] Error states load quickly
- [ ] No memory leaks when switching states
- [ ] Smooth transitions between states

### **5. Accessibility**

- [ ] Error messages are announced by screen readers
- [ ] Buttons have proper focus management
- [ ] Color contrast meets WCAG standards
- [ ] Keyboard navigation works

## 🔧 **Testing Checklist**

### **Before Testing:**

- [ ] Development server is running (`npm run dev`)
- [ ] Browser dev tools are open
- [ ] Console is clear of errors

### **During Testing:**

- [ ] Test each state for 30+ seconds
- [ ] Try interacting with all buttons
- [ ] Check console for any errors
- [ ] Test keyboard navigation
- [ ] Test on different screen sizes

### **After Testing:**

- [ ] All states work as expected
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Accessibility is maintained

## 🐛 **Common Issues to Look For**

### **Visual Issues:**

- Layout shifts during state changes
- Inconsistent spacing
- Missing error messages
- Broken button styles

### **Functional Issues:**

- Buttons not working
- State not updating
- Infinite loading
- Memory leaks

### **Accessibility Issues:**

- Missing ARIA labels
- Poor color contrast
- Keyboard navigation problems
- Screen reader issues

## 📱 **Mobile Testing**

Test on mobile devices or responsive mode:

- [ ] State tester panel is accessible
- [ ] Error messages fit on small screens
- [ ] Buttons are touch-friendly
- [ ] Text is readable

## 🎨 **Design Consistency**

Verify that all states maintain:

- [ ] Consistent color scheme
- [ ] Proper typography hierarchy
- [ ] Appropriate spacing
- [ ] Chakra UI design system compliance

---

**💡 Tip:** Use browser dev tools to simulate slow network conditions and test loading states more realistically!
