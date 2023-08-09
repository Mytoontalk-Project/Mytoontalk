import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Comic: {
    id: string;
  };
  Drawing: undefined;
  Preview: undefined;
};

export type ComicScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Comic"
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type DrawingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Drawing"
>;

export type PreviewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Preview"
>;

export interface LoadedComicsData {
  id: string;
  title: string;
  hasCover: boolean;
  imageUri: string | null;
  creationTime: number | null;
}
