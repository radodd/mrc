export interface AboutPageTypes {
  familyOwned?: {
    title: string;
  };
}

export interface CartPageTypes {
  accordion: {
    value: string;
    className?: string;
    trigger: string;
    contentStyle?: string;
    content: React.ReactNode;
  }[];
}

export interface ContactPageTypes {
  pageHeader: string;
  contact: {
    header: {
      title: string;
      text: string;
    };
    info: {
      company: string;
      phoneNumber: string;
      email: string;
    }[];
  };
  companyAddress: {
    id: number;
    name: string;
    address: string;
    maps: string;
  }[];
}
