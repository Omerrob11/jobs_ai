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
