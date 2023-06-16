import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

/**
 * @template {Store}
 * @param {Store} initialState
 */
export default function createFastContext(initialState) {
  /**
   * @typedef {Object} ReturnValue
   * @property {() => Store} get
   * @property {(value: Partial<Store>) => void} set
   * @property {(callback: () => void) => void} subscribe
   * @returns {ReturnValue}
   */
  function useStoreData() {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    /**
     * @type {new Set<() => void>()}
     */
    const subscribers = useRef();

    const set = useCallback(
      /**
       * @param {Partial<Store>} value
       */
      (value) => {
        store.current = { ...store.current, ...value };
        subscribers.current.forEach((callback) => callback());
      },
      []
    );

    /**
     * @param {() => void} callback
     */
    const subscribe = useCallback((callback) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }
  const StoreContext = createContext(null);
  /**
   * Renders a Provider component that wraps the given children with the StoreContext.Provider,
   * providing them with the useStoreData() value.
   *
   * @param {Object} props - the component props
   * @param {React.ReactNode} props.children - the children to wrap with the provider
   * @return {JSX.Element} the Provider component with the children wrapped with StoreContext.Provider
   */
  function Provider({ children }) {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  }
  /**
   * @template {SelectorOutput}
   * @param {(store: Store) => SelectorOutput)} selector
   * @returns {[SelectorOutput, (value: Partial<Store>) => void]}
   */
  function useStore(selector) {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState)
    );

    return [state, store.set];
  }

  return {
    Provider,
    useStore,
  };
}
