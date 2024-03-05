const aggregation = [
  {
    $facet: {
      selectedCountry: [
        { $match: { country: "FRA" } },
        {
          $group: {
            _id: "$stage",
            name: { $first: "$action_name" },
            total: { $sum: "$fund_eur" }
          }
        },
      ],
    }
  }
]