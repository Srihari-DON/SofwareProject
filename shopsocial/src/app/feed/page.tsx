
import BusinessList from "./BusinessList";
import AddBusinessForm from "./AddBusinessForm";

export default function FeedPage() {
  return (
    <div>
      <h1>Feed Page</h1>
      <AddBusinessForm />
      <BusinessList />
    </div>
  );
}
