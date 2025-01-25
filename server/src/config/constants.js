// objects are way to organize data
// especaiilly, grouping related data
// here, we have related data, so we put them in an ibhection
const JOB_STATUS = {
  statusToDb: {
    "עבודות שנשמרו": "wishlist",
    הוגשו: "applied",
    ראיונות: "interviewing",
    הצעה: "offer",
    דחייה: "rejected",
  },
  dbToStatus: {
    wishlist: "עבודות שנשמרו",
    applied: "הוגשו",
    interviewing: "ראיונות",
    offer: "הצעה",
    rejected: "דחייה",
  },
};

module.exports = { JOB_STATUS };
