interface AssessmentTypeDetail {
  key: string;
  value: string;
}

export interface Assessment {
  title: string;
  slug: string;
  altTitle?: string;
  type: AssessmentTypeDetail;
}
  
export interface ListItemProps {
  key: number;
  id: number
  itemTitle: string;
  assessments?:  Assessment | Assessment[];
  subItem?: string | string[];
  isIMC?: boolean;
}

