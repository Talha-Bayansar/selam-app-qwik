import { type Member } from "~/db";

const generateRandomMember = (): Member => {
  const id = Math.floor(Math.random() * 1000); // Generate a random ID
  const firstName = "John"; // Replace with your desired first name generation logic
  const lastName = "Doe"; // Replace with your desired last name generation logic
  const phoneNumber = Math.random() < 0.5 ? null : "123-456-7890"; // Optional phone number
  const address = Math.random() < 0.5 ? null : "123 Main St"; // Optional address
  const dateOfBirth = Math.random() < 0.5 ? null : "1990-01-01"; // Optional date of birth
  const gender = "male";

  return {
    id,
    firstName,
    lastName,
    phoneNumber,
    address,
    dateOfBirth,
    gender,
    organizationId: null,
    groupId: null,
  };
};

const generateMockMembers = (count: number): Member[] => {
  const mockMembers: Member[] = [];

  for (let i = 0; i < count; i++) {
    mockMembers.push(generateRandomMember());
  }

  return mockMembers;
};

const mockFetchMembers = () => {
  return new Promise<Member[]>((resolve) => {
    // Simulate an asynchronous response
    setTimeout(() => {
      resolve(generateMockMembers(20));
    }, 1000); // Simulate a delay, like a real network request
  });
};

export const getAllMembers = async () => {
  const result = await mockFetchMembers();
  return result;
};
