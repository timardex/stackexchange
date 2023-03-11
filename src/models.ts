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

export interface ICheckbox {
  label: string,
  checked: boolean,
}