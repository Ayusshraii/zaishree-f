// src/context/SubscriptionContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const SubscriptionContext = createContext();

const STORAGE_KEY = "subscription";

// Helper: read subscription from localStorage
const loadSubscription = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(loadSubscription);

  // Persist whenever subscription changes
  useEffect(() => {
    if (subscription) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [subscription]);

  // Check expiry on mount / periodically
  useEffect(() => {
    if (subscription?.expiresAt) {
      const isExpired = new Date(subscription.expiresAt) < new Date();
      if (isExpired) {
        setSubscription(null);
      }
    }
  }, [subscription]);

  const subscribe = useCallback((plan) => {
    // plan: { id, name, durationInDays, price }
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (plan?.durationInDays || 30));

    setSubscription({
      planId: plan.id,
      planName: plan.name,
      startedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    });
  }, []);

  const cancelSubscription = useCallback(() => {
    setSubscription(null);
  }, []);

  const hasSubscription = Boolean(
    subscription &&
      (!subscription.expiresAt ||
        new Date(subscription.expiresAt) > new Date())
  );

  const daysRemaining = subscription?.expiresAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(subscription.expiresAt) - new Date()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  const value = {
    subscription,
    hasSubscription,
    daysRemaining,
    subscribe,
    cancelSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
};

export default SubscriptionContext;