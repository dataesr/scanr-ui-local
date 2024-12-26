---
title: 'Mapping scientific communities at scale'
author:
  - Victor Barbier:
      institute: mesr
  - Eric Jeangirard:
      institute: mesr
      orcid: 0000-0002-3767-7125
      idref: 242241344

institute:
  - mesr:
      name: 'French Ministry of Higher Education and Research, Paris, France'
bibliography: bso.bib
date: January 2025
keywords:
  - scanR
  - VOSviewer
  - scientific ccommunity
  - research portal
  - Elasticsearch
  - network analysis
geometry: "left=3cm, right=3cm, top=3cm, bottom=3cm"
---

**Keywords**: open access, open science, open data, open source

# Abstract



# 1. Motivation

Analysing and mapping scientific communities provides an insight into the structure and evolution of academic disciplines. This involves providing an analytical and visual representation of the relationships between entities (e.g. researchers, research laboratories, research themes), with the aim, in particular, of understanding the networks and dynamics of scientific collaboration, and identifying collaborative groups and their influences. From the point of view of decision-makers, this type of tool is useful for strategic decision-making with a view to public policy and funding.

These maps are generally deduced from data in bibliographic databases (open or proprietary), based on co-publication or citation information. In the case of co-publications, two entities (authors, for example) will be linked if they have collaborated (co-published) on a piece of research. These links are then symmetrical. In the case of citation links, two authors will be linked if one cites the research work of another, in the list of references. This is a directed link, as one author may cite another without this being reciprocal. A lot of recent work uses this second approach, for example by trying to calculate composite indicators of novelty (or innovation) based on citation links. 

The quality and completeness of the bibliographic metadata used are, of course, essential if we are to produce a relevant map. Today, the quality of open citation data still needs to be improved, cf [@alperin2024analysissuitabilityopenalexbibliometric].
On the other hand, it is possible to obtain quality metadata on publications (and therefore links to co-publications). For example, the French Open Science Monitor (BSO) has compiled a corpus of French publications with good coverage cf [@10.1162/qss_a_00179]. This corpus is exposed in the French research portal scanR [@jeangirard:hal-04813230]. This is a corpus containing about 4 millions publications in all disciplines. These publications have been enriched with disambuation persistent identifier (PID) on authors, affiliations and topics. For authors and affiliations, French-specific PID have been used (idref for authors and RNSR for laboratories) because they have the best coverage, even if not perfect. For topics, wikidata identifiers has been used cf [@foppiano2020entity]. Other enrichments, like software detection are also present, and thus usable as entities to map.

## 1.1 Current limits of the scanR application

## 1.3 Network analysis limits

# 2. Network analysis at scale

## Focusing on strongest interactions

## Elasticsearch impl

## VOSviewer implem

## LLM trick

# 3. Making insightful maps

## Citation / hot topics

## User interaction

# References
