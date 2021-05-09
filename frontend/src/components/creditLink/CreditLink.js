// Core
import React from "react";
//Components
import { Link, Icon } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

const CreditLink = ({ author, link }) => (
    <Link
        w="100%"
        textAlign="end"
        fontWeight="bold"
        fontStyle="italic"
        color="secondaryColor"
        href={link}
        isExternal
    >
        - by {author}
        <Icon ml="10px" as={FaExternalLinkAlt} />
    </Link>
);

export default CreditLink;
