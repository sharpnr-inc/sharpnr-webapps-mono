interface HotelDashboardIndexPageProps {
  hotelID: string;
  propertyID: string;
}

const HotelDashboardIndexPage: React.FC<HotelDashboardIndexPageProps> = ({
  hotelID,
  propertyID,
}) => {
  return (
    <div>
      <div>{propertyID}</div>
      <div>{hotelID}</div>
    </div>
  );
};

export default HotelDashboardIndexPage;
