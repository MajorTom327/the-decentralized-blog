import { UnixFS, unixfs } from "@helia/unixfs";
import { createHelia } from "helia";
import { has, prop } from "ramda";
import {
  useEffect,
  useState,
  useCallback,
  createContext,
  ReactNode,
} from "react";

type HeliaReturn = Awaited<ReturnType<typeof createHelia>>;

type HeliaContextType = {
  helia: HeliaReturn | null;
  fs: UnixFS | null;
  starting: boolean;
  error: boolean;
};

export const HeliaContext = createContext<HeliaContextType>({
  helia: null,
  fs: null,
  error: false,
  starting: true,
});

export const HeliaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [helia, setHelia] = useState<HeliaReturn | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [fs, setFs] = useState<UnixFS | null>(null);
  const [starting, setStarting] = useState(true);
  const [error, setError] = useState(false);

  const startHelia = useCallback(async () => {
    if (helia) {
      console.info("helia already started");
    } else if (has("helia", window)) {
      console.info("found a windowed instance of helia, populating ...");
      const localHelia = prop<HeliaReturn>("helia", window);
      setHelia(localHelia);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setFs(unixfs(localHelia));
      setStarting(false);
    } else {
      try {
        console.info("Starting Helia");
        const helia = await createHelia();

        console.log("helia", helia);
        setHelia(helia);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setFs(unixfs(helia));
        setStarting(false);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    }
  }, []);

  useEffect(() => {
    void startHelia();
  }, []);

  return (
    <HeliaContext.Provider
      value={{
        helia,
        fs,
        error,
        starting,
      }}
    >
      {children}
    </HeliaContext.Provider>
  );
};

export default HeliaProvider;
