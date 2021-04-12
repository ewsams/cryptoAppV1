export interface Comment {
  id: number;
  title: string;
  body: string;
  likeAllowed?: boolean;
  likeCount?: number;
  isEdit?: boolean;
  likeUrl:
    '../../../../assets/img/liked-heart.png'
    | '../../../../assets/img/heart-icon.png';
}
