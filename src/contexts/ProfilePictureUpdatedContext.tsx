import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

// Create the context
interface ProfilePictureContextType {
  isProfilePictureUpdated: boolean;
  setIsProfilePictureUpdated: Dispatch<SetStateAction<boolean>>;
}

const ProfilePictureContext = createContext<
  ProfilePictureContextType | undefined
>(undefined);

// Create a custom hook to use the ProfilePictureContext
export const useProfilePictureContext = () => {
  const context = useContext(ProfilePictureContext);
  return context;
};

// Create a provider component
interface ProfilePictureProviderProps {
  children: ReactNode;
}

export const ProfilePictureProvider = ({
  children,
}: ProfilePictureProviderProps) => {
  const [isProfilePictureUpdated, setIsProfilePictureUpdated] = useState(false);

  return (
    <ProfilePictureContext.Provider
      value={{ isProfilePictureUpdated, setIsProfilePictureUpdated }}
    >
      {children}
    </ProfilePictureContext.Provider>
  );
};
