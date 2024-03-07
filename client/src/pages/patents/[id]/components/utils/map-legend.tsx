export default function MapLegend() {
  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "gray",
            marginRight: "5px",
            borderRadius: "50%",
          }}
        ></div>
        <span>Pays sans dépôt</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#E18B76",
            marginRight: "5px",
            borderRadius: "50%",
          }}
        ></div>
        <span>
          Brevets de l'Organisation mondiale de la propriété intellectuelle
          {/* WO */}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#465F9D",
            marginRight: "5px",
            borderRadius: "50%",
          }}
        ></div>
        <span>
          Brevets de l'Office européen des brevets
          {/* EP */}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#e6feda",
            marginRight: "5px",
            borderRadius: "50%",
          }}
        ></div>
        <span>
          Brevets de l'Organisation eurasienne des brevets
          {/* EA */}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#C8AA39",
            marginRight: "5px",
            borderRadius: "50%",
          }}
        ></div>
        <span>
          Brevets de l'African Regional Property Organization (ARIPO)
          {/* AP */}
        </span>
      </div>
    </div>
  );
}
