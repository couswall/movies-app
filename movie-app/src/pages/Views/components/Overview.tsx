
interface OverviewProps {
    overview: string;
}

export const Overview: React.FC<OverviewProps> = ({overview}) => {
  return (
    <>
        <h5>Overview</h5>
        <p className="overview">{ overview }</p>
    </>
  )
}
