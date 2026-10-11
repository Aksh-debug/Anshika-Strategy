export type BookingType = '1on1' | 'group';

export type ProfileOption =
  | 'Student'
  | 'Working Professional'
  | 'Entrepreneur'
  | 'Founder'
  | 'Other'
  | '';

export type CommitmentOption = 'Yes' | 'No' | '';

export type ConfidenceLevel =
  | 'Just starting out'
  | 'Somewhat confident'
  | 'Confident, want to level up'
  | '';

export interface ConsultationFormData {
  // Path selection
  bookingType: BookingType;

  // Step 1: About You
  profile: ProfileOption;
  commitment: CommitmentOption; // for 1:1 path
  confidenceLevel: ConfidenceLevel; // for group path

  // Step 2: Your Goal
  speakingSituation: string;
  otherSituationText: string;

  // Step 3: Your Details
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  consent: boolean;
}

export const initialFormData: ConsultationFormData = {
  bookingType: '1on1',
  profile: '',
  commitment: '',
  confidenceLevel: '',
  speakingSituation: '',
  otherSituationText: '',
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '+1',
  phone: '',
  consent: false,
};
