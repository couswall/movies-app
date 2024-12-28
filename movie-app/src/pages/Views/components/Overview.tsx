import { VIEW_TEXTS } from "../../constants/Views.constants";

interface OverviewProps {
    overview: string;
}

export const Overview: React.FC<OverviewProps> = ({overview}) => {
  return (
    <>
        <h5>{VIEW_TEXTS.OVERVIEW}</h5>
        <p className="overview">{ overview }</p>
    </>
  )
}
