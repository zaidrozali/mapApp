import { type User, type InsertUser, type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByState(state: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.initializeSampleProjects();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByState(state: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.state === state,
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  private initializeSampleProjects(): void {
    const sampleProjects: InsertProject[] = [
      {
        title: "Kuala Lumpur MRT Line 3",
        description: "Construction of the third MRT line connecting major residential and commercial areas in Kuala Lumpur, improving public transportation infrastructure and reducing traffic congestion.",
        state: "Selangor",
        location: "Kuala Lumpur & Selangor",
        category: "Infrastructure",
        status: "Ongoing",
      },
      {
        title: "Penang South Islands Development",
        description: "Large-scale land reclamation project creating three artificial islands to support economic growth, housing development, and tourism infrastructure.",
        state: "Penang",
        location: "Southern Penang",
        category: "Development",
        status: "Planned",
      },
      {
        title: "Perak Smart Agriculture Initiative",
        description: "Technology-driven agricultural program implementing IoT sensors, automated irrigation, and data analytics to improve crop yields and farmer incomes.",
        state: "Perak",
        location: "Kinta Valley",
        category: "Economic",
        status: "Ongoing",
      },
      {
        title: "Johor Bahru Coastal Highway",
        description: "New coastal expressway linking Johor Bahru city center with eastern coastal areas, enhancing connectivity and supporting industrial development.",
        state: "Johor",
        location: "Johor Bahru",
        category: "Infrastructure",
        status: "Completed",
      },
      {
        title: "Sabah Rural Electrification",
        description: "Installing solar power systems and grid connections to provide electricity access to remote villages, improving quality of life and enabling economic activities.",
        state: "Sabah",
        location: "Interior Sabah",
        category: "Social",
        status: "Ongoing",
      },
      {
        title: "Sarawak Digital Hub",
        description: "Establishing a technology park and innovation center to attract tech companies, create jobs, and position Sarawak as a digital economy leader.",
        state: "Sarawak",
        location: "Kuching",
        category: "Economic",
        status: "Ongoing",
      },
      {
        title: "Melaka Heritage Conservation",
        description: "Restoration and preservation of historical buildings and sites, enhancing tourism appeal while maintaining cultural heritage for future generations.",
        state: "Melaka",
        location: "Melaka City",
        category: "Social",
        status: "Ongoing",
      },
      {
        title: "Kedah Paddy Field Modernization",
        description: "Upgrading irrigation systems and introducing mechanized farming equipment to increase rice production efficiency in Malaysia's rice bowl.",
        state: "Kedah",
        location: "Alor Setar Region",
        category: "Economic",
        status: "Completed",
      },
      {
        title: "Pahang Eco-Tourism Development",
        description: "Creating sustainable tourism facilities in national parks and rainforests, balancing environmental conservation with economic opportunities for local communities.",
        state: "Pahang",
        location: "Taman Negara Area",
        category: "Development",
        status: "Planned",
      },
      {
        title: "Selangor Water Treatment Plant Expansion",
        description: "Expanding water treatment capacity to meet growing demand in Klang Valley, ensuring reliable clean water supply for residential and industrial needs.",
        state: "Selangor",
        location: "Semenyih",
        category: "Infrastructure",
        status: "Ongoing",
      },
      {
        title: "Terengganu Fisheries Modernization",
        description: "Upgrading fishing vessels and port facilities, introducing sustainable fishing practices, and establishing seafood processing centers.",
        state: "Terengganu",
        location: "Kuala Terengganu",
        category: "Economic",
        status: "Ongoing",
      },
      {
        title: "Negeri Sembilan Industrial Park",
        description: "Developing a modern industrial zone with advanced logistics infrastructure to attract foreign investment and create employment opportunities.",
        state: "Negeri Sembilan",
        location: "Seremban",
        category: "Development",
        status: "Planned",
      },
      {
        title: "Kelantan Flood Mitigation System",
        description: "Installing comprehensive flood control infrastructure including retention ponds, drainage systems, and river embankments to protect communities.",
        state: "Kelantan",
        location: "Kota Bharu",
        category: "Infrastructure",
        status: "Ongoing",
      },
      {
        title: "Perlis Border Economic Zone",
        description: "Establishing a special economic zone near Thailand border to facilitate trade, tourism, and cross-border business activities.",
        state: "Perlis",
        location: "Padang Besar",
        category: "Economic",
        status: "Planned",
      },
      {
        title: "Perak Tourism Circuit Development",
        description: "Creating integrated tourism routes connecting heritage sites, natural attractions, and cultural landmarks to boost visitor experience.",
        state: "Perak",
        location: "Ipoh & Taiping",
        category: "Development",
        status: "Ongoing",
      },
      {
        title: "Sabah Wildlife Conservation Center",
        description: "Building research and rehabilitation facilities for endangered species including orangutans and pygmy elephants, promoting eco-tourism.",
        state: "Sabah",
        location: "Sepilok",
        category: "Social",
        status: "Completed",
      },
    ];

    sampleProjects.forEach((project) => {
      const id = randomUUID();
      this.projects.set(id, { ...project, id });
    });
  }
}

export const storage = new MemStorage();
