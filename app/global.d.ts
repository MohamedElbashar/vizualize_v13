import { Database as DB, IDocumentType as Doc } from "@/lib/database.types";

declare global {
  type Database = DB;
  type IDocumentType = Doc;
}
