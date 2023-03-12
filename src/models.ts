export interface IContent {
  tags: string[],
  owner: {
    account_id: number,
    reputation: number,
    user_id: number,
    user_type: string,
    profile_image: string,
    display_name: string,
    link: string,
  },
  is_answered: boolean,
  view_count: number,
  answer_count: number,
  score: number,
  last_activity_date: Date,
  creation_date: Date,
  last_edit_date: Date,
  question_id: number,
  content_license: string,
  link: string,
  title: string,
};

export interface IUser {
  badge_counts: {
    bronze: number,
    silver: number,
    gold: number,
  },
  account_id: number,
  is_employee: boolean,
  last_access_date: Date,
  reputation_change_year: number,
  reputation_change_quarter: number,
  reputation_change_month: number,
  reputation_change_week: number,
  reputation_change_day: number,
  reputation: number,
  creation_date: number,
  user_type: string,
  user_id: number,
  location: string,
  link: string,
  profile_image: string,
  display_name: string,
};

export interface IBadge {
  user: {
    account_id: number,
    reputation: number,
    user_id: number,
    user_type: string,
    profile_image: string,
    display_name: string,
    link: string,
  },
  badge_type: string,
  award_count: number,
  rank: string,
  badge_id: number,
  link: string,
  name: string,
};

export interface ITag {
  has_synonyms: boolean,
  user_id: number,
  is_moderator_only: boolean,
  is_required: boolean,
  count: number,
  name: string,
};

export interface IUserPost {
  owner: {
    account_id: number,
    reputation: number,
    user_id: number,
    user_type: string,
    profile_image: string,
    display_name: string,
    link: string,
  },
  score: number,
  last_activity_date: number,
  creation_date: number,
  post_type: string,
  post_id: number,
  content_license: string,
  link: string,
};