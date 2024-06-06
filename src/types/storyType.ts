import { SchemaDefinitionProperty } from 'mongoose';

type StoryType = {
  _id?: string;
  title: string;
  story: string;
  createdBy: SchemaDefinitionProperty;
  createdAt: Date;
};

export default StoryType;
